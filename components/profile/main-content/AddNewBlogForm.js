// components/profile/main-content/AddNewBlogForm.js
"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  convertToRaw,
  convertFromRaw,
  ContentState,
  Modifier,
  CompositeDecorator,
  SelectionState
} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { stateToHTML } from 'draft-js-export-html';
import addBlog from '@/lib/actions/addBlog';
import updateUser from '@/lib/actions/updateUser';
import { findUser } from '@/lib/actions/findUser';

const AddNewBlogForm = React.memo(function AddNewBlogForm({ user }) {
  const router = useRouter();
  const handleSoftReload = () => { router.refresh(); };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
    getValues
  } = useForm({
    defaultValues: {
      title: '',
      excerpt: '',
      content: JSON.stringify(convertToRaw(EditorState.createEmpty().getCurrentContent())),
      category: '',
      imageURL: '',
    }
  });

  const editorRef = useRef(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showImageUrlModal, setShowImageUrlModal] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [linkUrlInput, setLinkUrlInput] = useState('');
  const [linkNameInput, setLinkNameInput] = useState('');
  const [showLinkUrlModal, setShowLinkUrlModal] = useState(false);

  const [editingEntityKey, setEditingEntityKey] = useState(null);
  const [editingEntitySelection, setEditingEntitySelection] = useState(null);
  const [editingEntityType, setEditingEntityType] = useState(null);

  const lastSyncedContentRef = useRef(null);

  // --- Draft.js Decorator Setup (for links) ---
  const findLinkEntities = useCallback((contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return (
          entityKey !== null &&
          contentState.getEntity(entityKey).getType() === 'LINK'
        );
      },
      callback
    );
  }, []);

  const LinkComponent = useCallback((props) => {
    const { contentState, entityKey, decoratedText, offset, children, blockKey } = props;

    if (!contentState || entityKey === undefined) {
      console.error("Link component received incomplete props from decorator:", props);
      return <span>{children}</span>;
    }

    const { url } = contentState.getEntity(entityKey).getData();

    const handleClick = (e) => {
      e.preventDefault();
      const start = offset;
      const end = offset + decoratedText.length;

      const selection = SelectionState.createEmpty().merge({
        anchorKey: blockKey,
        focusKey: blockKey,
        anchorOffset: start,
        focusOffset: end,
        isBackward: false,
      });

      setEditingEntityKey(entityKey);
      setEditingEntitySelection(selection);
      setEditingEntityType('LINK');
      setLinkUrlInput(url);
      setLinkNameInput(decoratedText);
      setShowLinkUrlModal(true);
    };

    return (
      <a
        href={url}
        style={{ color: '#3b82f6', textDecoration: 'underline', cursor: 'pointer' }}
        onClick={handleClick}
      >
        {children}
      </a>
    );
  }, []);

  const editorDecorator = useMemo(() => {
    return new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: LinkComponent,
      },
    ]);
  }, [findLinkEntities, LinkComponent]);


  const [editorState, setEditorState] = useState(() => {
    try {
      const rawContentString = control._defaultValues.content;
      const rawContent = rawContentString ? JSON.parse(rawContentString) : null;
      const content = (rawContent && rawContent.entityMap && rawContent.blocks)
        ? convertFromRaw(rawContent)
        : ContentState.createEmpty();
      return EditorState.createWithContent(content, editorDecorator);
    } catch (e) {
      console.error("Error parsing editor content on initialization:", e);
      return EditorState.createEmpty(editorDecorator);
    }
  });

  // --- Helper Functions for Editor Actions ---
  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const toggleBlockType = useCallback((editorState, type) => {
    return RichUtils.toggleBlockType(editorState, type);
  }, []);

  const toggleInlineStyle = useCallback((editorState, style) => {
    return RichUtils.toggleInlineStyle(editorState, style);
  }, []);

  const insertImage = useCallback((editorState, src) => {
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'IMAGE',
      'IMMUTABLE',
      { src: src }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
    return EditorState.forceSelection(newEditorState, newEditorState.getSelection());
  }, []);


  // --- Custom Media Block Renderer ---
  const Media = useCallback(({ contentState, block }) => {
    const entityKey = block.getEntityAt(0);
    if (!entityKey) return null;

    const entity = contentState.getEntity(entityKey);
    const { src } = entity.getData();

    const handleDelete = () => {
      const blockKey = block.getKey();
      const currentContent = editorState.getCurrentContent();
      const blockSelection = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: 0,
        focusKey: blockKey,
        focusOffset: block.getLength(),
      });

      const contentAfterRemoval = Modifier.removeRange(
        currentContent,
        blockSelection,
        'backward' // or 'forward', depends on preference
      );

      let newSelection = contentAfterRemoval.getSelectionAfter();

      // If the selection is still pointing to the removed block, adjust it.
      if (newSelection.getAnchorKey() === blockKey || newSelection.getFocusKey() === blockKey) {
        const blocks = contentAfterRemoval.getBlocksAsArray();
        const blockIndex = blocks.findIndex(b => b.getKey() === blockKey);

        if (blockIndex > 0) {
          const prevBlock = blocks[blockIndex - 1];
          newSelection = newSelection.merge({
            anchorKey: prevBlock.getKey(),
            focusKey: prevBlock.getKey(),
            anchorOffset: prevBlock.getLength(),
            focusOffset: prevBlock.getLength(),
          });
        } else if (blocks.length > 0) {
          const firstBlock = blocks[0];
          newSelection = newSelection.merge({
            anchorKey: firstBlock.getKey(),
            focusKey: firstBlock.getKey(),
            anchorOffset: 0,
            focusOffset: 0,
          });
        } else {
          const emptyContent = ContentState.createEmpty();
          newSelection = emptyContent.getSelectionAfter();
        }
      }

      const newEditorState = EditorState.push(editorState, contentAfterRemoval, 'remove-range');
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    };

    return (
      <div className="relative my-4 rounded-lg shadow-md max-w-full h-auto group">
        <img src={src} alt="Blog Content" className="max-w-full h-auto rounded-lg" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 mx-2"
            onClick={(e) => { e.stopPropagation(); handleDelete(); }}
          >
            Delete Image
          </button>
        </div>
      </div>
    );
  }, [editorState, setEditorState]);

  const mediaBlockRenderer = useCallback((block) => {
    if (block.getType() === 'atomic') {
      const entityKey = block.getEntityAt(0);
      if (entityKey) {
        const entity = editorState.getCurrentContent().getEntity(entityKey);
        if (entity.getType() === 'IMAGE') {
          return {
            component: Media,
            editable: false,
          };
        }
      }
    }
    return null;
  }, [editorState, Media]);

  // --- Form Submission Handler ---
  const onSubmit = async (data) => {
    setSubmitMessage('');
    setMessageType('');

    const generateUniqueSlug = (title, excerpt = '', timestamp = Date.now()) => {
      // 1. Sanitize Title
      const sanitizedTitle = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
        .replace(/[\s_-]+/g, '-')  // Replace spaces/underscores with single hyphens
        .replace(/^-+|-+$/g, '');  // Remove leading/trailing hyphens

      // 2. Sanitize Excerpt (optional, only use if provided and meaningful)
      let sanitizedExcerpt = '';
      if (excerpt) {
        sanitizedExcerpt = excerpt
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '')
          .substring(0, 30); // Take first 30 chars of excerpt for brevity
      }

      // 3. Generate a compact timestamp
      // Using base36 (alphanumeric) makes it shorter than standard milliseconds
      const compactTimestamp = timestamp.toString(36);

      // 4. Combine parts
      let slugParts = [sanitizedTitle];
      if (sanitizedExcerpt) {
        slugParts.push(sanitizedExcerpt);
      }
      slugParts.push(compactTimestamp); // Always include timestamp for uniqueness

      // Join with hyphen, ensuring no double hyphens if excerpt was empty
      const finalSlug = slugParts.join('-').replace(/--+/g, '-');

      return finalSlug;
    }

    try {
      const contentState = convertFromRaw(JSON.parse(data.content));

      const htmlContent = stateToHTML(contentState, {
        blockRenderers: {
          atomic: (block) => {
            const entity = contentState.getEntity(block.getEntityAt(0));
            if (entity && entity.getType() === 'IMAGE') {
              return `<img src="${entity.getData().src}" alt="Blog Image" style="max-width:100%; height:auto; border-radius: 8px;" />`;
            }
            return null;
          },
        },
        entityStyleFn: (entity) => {
          if (entity.getType() === 'LINK') {
            const { url } = entity.getData();
            return {
              element: 'a',
              attributes: {
                href: url,
                target: '_blank',
                rel: 'noopener noreferrer',
              },
            };
          }
          return null;
        },
        inlineStyleFn: (style) => {
          return null;
        }
      });

      if (!data.imageURL) { data.imageURL = "/images/pexels-pixabay-159618.jpg" }

      const newBlogData = {
        ...data,
        userId: user._id,
        content: htmlContent,
        author: user.name,
        date: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slug: generateUniqueSlug(data.title, data.excerpt),
      };

      let newBlog = await addBlog(newBlogData)
      let writer = await findUser({ email: user.email })

      console.log(user._id, { posts: [...(writer.posts), newBlog._id] })
      console.log(newBlogData)
      await updateUser(user._id, { posts: [...(writer.posts), newBlog._id] })

      handleSoftReload()
      console.log('Submitting new blog:', newBlogData);
      setSubmitMessage('Blog post added successfully!');
      setMessageType('success');
      reset();
      setEditorState(EditorState.createEmpty(editorDecorator));
    } catch (error) {
      console.error('Error adding new blog:', error);
      setSubmitMessage('Failed to add blog post. Please try again.');
      setMessageType('error');
    } finally {
      setTimeout(() => setSubmitMessage(''), 3000);
    }
  };

  useEffect(() => {
    const currentRawContent = convertToRaw(editorState.getCurrentContent());
    const currentRawContentString = JSON.stringify(currentRawContent);

    const formContentValue = getValues('content');

    if (currentRawContentString !== lastSyncedContentRef.current) {
      setValue('content', currentRawContentString, { shouldDirty: true });
      lastSyncedContentRef.current = currentRawContentString;
    }
  }, [editorState, setValue, getValues]);


  const handleEditorChange = useCallback((newEditorState) => {
    setEditorState(newEditorState);
  }, []);

  const currentStyle = editorState.getCurrentInlineStyle();
  const blockType = RichUtils.getCurrentBlockType(editorState);

  // --- Modal Button Handlers ---
  const handleImageButtonClick = useCallback(() => {
    setImageUrlInput('');
    setShowImageUrlModal(true);
  }, []);

  const handleLinkButtonClick = useCallback(() => {
    const selection = editorState.getSelection();
    if (selection.isCollapsed() || editorState.getCurrentContent().getPlainText(selection).trim() === '') {
      setSubmitMessage('Please select some text to make it a link.');
      setMessageType('error');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }
    setEditingEntityKey(null);
    setEditingEntitySelection(null);
    setEditingEntityType('LINK');
    setLinkUrlInput('');
    setLinkNameInput(editorState.getCurrentContent().getPlainText(selection));
    setShowLinkUrlModal(true);
  }, [editorState]);

  // --- Modal Action Handlers (Add for Image, Add/Update/Delete for Link) ---
  const handleAddImage = useCallback(() => {
    if (!imageUrlInput) {
      setSubmitMessage('Please enter an image URL.');
      setMessageType('error');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }

    const newEditorState = insertImage(editorState, imageUrlInput);

    handleEditorChange(newEditorState);
    setShowImageUrlModal(false);
    setImageUrlInput('');
  }, [imageUrlInput, insertImage, editorState, handleEditorChange]);

  const handleAddOrUpdateLink = useCallback(() => {
    if (!linkUrlInput) {
      setSubmitMessage('Please enter a URL for the link.');
      setMessageType('error');
      setTimeout(() => setSubmitMessage(''), 3000);
      return;
    }

    let newEditorState = editorState;
    let finalSelection = editorState.getSelection();
    let contentState = newEditorState.getCurrentContent();

    if (editingEntityKey && editingEntityType === 'LINK') {
      // If editing an existing link, first remove the old entity from the selection
      contentState = Modifier.applyEntity(
        contentState,
        editingEntitySelection,
        null
      );
      newEditorState = EditorState.push(newEditorState, contentState, 'apply-entity');
      finalSelection = editingEntitySelection; // Restore original selection for re-application
    } else {
      finalSelection = editorState.getSelection();
    }

    const contentStateWithNewEntity = newEditorState.getCurrentContent().createEntity(
      'LINK',
      'MUTABLE',
      { url: linkUrlInput }
    );
    const newEntityKey = contentStateWithNewEntity.getLastCreatedEntityKey();

    const newContentState = Modifier.replaceText(
      contentStateWithNewEntity,
      finalSelection,
      linkNameInput,
      newEditorState.getCurrentInlineStyle(),
      newEntityKey
    );

    newEditorState = EditorState.push(newEditorState, newContentState, 'apply-entity');

    // Ensure selection is correctly placed after applying the link
    newEditorState = EditorState.forceSelection(
      newEditorState,
      newEditorState.getSelection().merge({
        anchorOffset: finalSelection.getEndOffset(),
        focusOffset: finalSelection.getEndOffset(),
      })
    );

    handleEditorChange(newEditorState);
    setShowLinkUrlModal(false);
    setLinkUrlInput('');
    setLinkNameInput('');
    setEditingEntityKey(null);
    setEditingEntitySelection(null);
    setEditingEntityType(null);
  }, [editorState, editingEntityKey, editingEntityType, editingEntitySelection, handleEditorChange, linkNameInput, linkUrlInput]);


  const handleDeleteLink = useCallback(() => {
    if (editingEntityKey && editingEntityType === 'LINK' && editingEntitySelection) {
      let currentContent = editorState.getCurrentContent();
      const currentSelection = editorState.getSelection(); // Store current selection

      // Remove the entity from the text range by applying a null entity
      currentContent = Modifier.applyEntity(
        currentContent,
        editingEntitySelection, // Use the selection where the entity was found
        null // Set entity to null to unlink
      );

      // Push the new content state to editorState
      let newEditorState = EditorState.push(editorState, currentContent, 'apply-entity');

      // Crucial: Restore the selection that was active before opening the modal,
      // or at least a valid selection in the editor.
      newEditorState = EditorState.forceSelection(newEditorState, currentSelection); // Re-apply the selection

      handleEditorChange(newEditorState);
      setShowLinkUrlModal(false);
      setLinkUrlInput('');
      setLinkNameInput('');
      setEditingEntityKey(null);
      setEditingEntitySelection(null);
      setEditingEntityType(null);
    }
  }, [editorState, editingEntityKey, editingEntityType, editingEntitySelection, handleEditorChange]);

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 animate-fade-in-down">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6 pb-9 md:px-4 rounded-lg">
        {/* Blog Title Input */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-secondary mb-1">
            Blog Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Blog title is required" })}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm focus:shadow-md"
            placeholder="Your amazing blog title"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
        </div>

        {/* Excerpt Input */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-secondary mb-1">
            Excerpt (Short Summary)
          </label>
          <textarea
            id="excerpt"
            rows="2"
            {...register("excerpt")}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm focus:shadow-md"
            placeholder="A brief summary of your blog post"
          ></textarea>
        </div>

        {/* Blog Content (Draft.js Editor) */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-secondary mb-1">
            Blog Content <span className="text-red-500">*</span>
          </label>
          <Controller
            name="content"
            control={control}
            rules={{
              validate: (value) => {
                const contentState = value ? convertFromRaw(JSON.parse(value)) : ContentState.createEmpty();
                return contentState.hasText() || contentState.getBlocks().some(block => block.getType() !== 'unstyled' || block.getText().length > 0) || "Blog content is required";
              }
            }}
            render={({ field }) => (
              <div className="bg-gray-50 border border-gray-300 rounded-md p-2 text-primary dark:text-white">
                {/* Editor Toolbar */}
                <div className="flex flex-wrap gap-2 mb-2 p-2 rounded-md bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <button
                    type="button"
                    onClick={() => {
                      const newType = blockType === 'header-one' ? 'unstyled' : 'header-one';
                      handleEditorChange(toggleBlockType(editorState, newType));
                    }}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                      ${blockType === 'header-one' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                    onMouseDown={(e) => e.preventDefault()}
                    title={blockType === 'header-one' ? 'Switch to Paragraph' : 'Switch to Heading (H1)'}
                  >
                    H1
                  </button>

                  {['BOLD', 'ITALIC', 'UNDERLINE', 'CODE'].map(style => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => handleEditorChange(toggleInlineStyle(editorState, style))}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                        ${currentStyle.has(style) ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                      onMouseDown={(e) => e.preventDefault()}
                      title={style.charAt(0) + style.slice(1).toLowerCase()}
                    >
                      {style === 'BOLD' && 'B'}
                      {style === 'ITALIC' && 'I'}
                      {style === 'UNDERLINE' && 'U'}
                      {style === 'CODE' && '< >'}
                    </button>
                  ))}

                  {['unordered-list-item', 'ordered-list-item'].map(type => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => handleEditorChange(toggleBlockType(editorState, type))}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                        ${blockType === type ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                      onMouseDown={(e) => e.preventDefault()}
                      title={type === 'unordered-list-item' ? 'Unordered List' : 'Ordered List'}
                    >
                      {type === 'unordered-list-item' && 'UL'}
                      {type === 'ordered-list-item' && 'OL'}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => handleEditorChange(toggleBlockType(editorState, 'blockquote'))}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200
                      ${blockType === 'blockquote' ? 'bg-blue-600 text-white shadow-sm' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600'}`}
                    onMouseDown={(e) => e.preventDefault()}
                    title="Blockquote"
                  >
                    Quote
                  </button>

                  <button
                    type="button"
                    onClick={handleImageButtonClick}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
                    onMouseDown={(e) => e.preventDefault()}
                    title="Add Image"
                  >
                    Image
                  </button>

                  <button
                    type="button"
                    onClick={handleLinkButtonClick}
                    className="px-3 py-1 rounded-md text-sm font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200 shadow-sm"
                    onMouseDown={(e) => e.preventDefault()}
                    title="Add Link"
                  >
                    Link
                  </button>
                </div>

                {/* Draft.js Editor Area */}
                <div
                  className="min-h-[200px] p-3 border border-gray-300 rounded-md bg-white text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white cursor-text focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all duration-200 shadow-sm"
                  onClick={focusEditor}
                >
                  <Editor
                    editorState={editorState}
                    onChange={handleEditorChange}
                    ref={editorRef}
                    blockRendererFn={mediaBlockRenderer}
                    placeholder="Write your blog post here..."
                    decorator={editorDecorator}
                    key="blog-post-editor"
                  />
                </div>

                {/* Image URL Modal */}
                {showImageUrlModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md animate-scale-in">
                      <h3 className="text-lg font-bold mb-4 text-primary dark:text-white">
                        Add Image URL
                      </h3>
                      <input
                        type="url"
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm mb-4"
                        placeholder="https://example.com/image.jpg"
                        value={imageUrlInput}
                        onChange={(e) => setImageUrlInput(e.target.value)}
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowImageUrlModal(false);
                            setImageUrlInput('');
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          onClick={handleAddImage}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                          Add Image
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Link URL Modal */}
                {showLinkUrlModal && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md animate-scale-in">
                      <h3 className="text-lg font-bold mb-4 text-primary dark:text-white">
                        {editingEntityKey && editingEntityType === 'LINK' ? 'Edit Link' : 'Add Link'}
                      </h3>
                      <label htmlFor="linkName" className="block text-sm font-medium text-secondary mb-1">
                        Link Text
                      </label>
                      <input
                        type="text"
                        id="linkName"
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm mb-4"
                        placeholder="Text to display for the link"
                        value={linkNameInput}
                        onChange={(e) => setLinkNameInput(e.target.value)}
                      />
                      <label htmlFor="linkUrl" className="block text-sm font-medium text-secondary mb-1">
                        Link URL
                      </label>
                      <input
                        type="url"
                        id="linkUrl"
                        className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm mb-4"
                        placeholder="https://example.com"
                        value={linkUrlInput}
                        onChange={(e) => setLinkUrlInput(e.target.value)}
                      />
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          onClick={() => {
                            setShowLinkUrlModal(false);
                            setEditingEntityKey(null);
                            setEditingEntitySelection(null);
                            setEditingEntityType(null);
                          }}
                          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                        {editingEntityKey && editingEntityType === 'LINK' && (
                          <button
                            type="button"
                            onClick={handleDeleteLink}
                            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                          >
                            Delete Link
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={handleAddOrUpdateLink}
                          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                          {editingEntityKey && editingEntityType === 'LINK' ? 'Update Link' : 'Add Link'}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          />
          {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content.message}</p>}
        </div>

        {/* Category Input */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-secondary mb-1">
            Category <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="category"
            {...register("category", { required: "Category is required" })}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm focus:shadow-md"
            placeholder="e.g., Technology, Lifestyle, Travel"
          />
          {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
        </div>

        {/* Optional Image URL for Blog Post Thumbnail/Featured Image */}
        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium text-secondary mb-1">
            Featured Image URL (Optional)
          </label>
          <input
            type="url"
            id="imageURL"
            {...register("imageURL")}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-primary dark:bg-gray-800 dark:border-gray-600 dark:text-white transition-all duration-200 shadow-sm focus:shadow-md"
            placeholder="https://example.com/featured-image.jpg"
          />
          {errors.imageURL && <p className="text-red-600 text-sm mt-1">{errors.imageURL.message}</p>}
        </div>

        {/* Submission Message */}
        {submitMessage && (
          <div
            className={`p-3 rounded-md text-center text-sm font-medium ${messageType === 'success'
              ? 'bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200'
              : 'bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200'
              } animate-fade-in`}
          >
            {submitMessage}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding Blog Post...' : 'Add Blog Post'}
        </button>
      </form>
    </div>
  );
});

export default AddNewBlogForm;
