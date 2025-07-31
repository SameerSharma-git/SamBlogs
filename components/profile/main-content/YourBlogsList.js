// components/profile/YourBlogsList.jsx
"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import deleteBlogById from '@/lib/actions/deleteBlogById';
import updateUser from '@/lib/actions/updateUser';

export default function YourBlogsList({ user, formatDate, setSelectedView }) {
  const router = useRouter();
  const handleSoftReload = () => { router.refresh(); };

  const [posts, setPosts] = useState(user.posts || []);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  // Filter and Sort States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'title-asc', 'title-desc'

  // Extract unique categories for the filter dropdown
  const categories = useMemo(() => {
    const allCategories = posts.map(post => post.category);
    return ['All', ...new Set(allCategories)].sort();
  }, [posts]);

  // Memoize filtered and sorted posts to optimize performance
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // 1. Filter by Search Term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 2. Filter by Category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    // 3. Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === 'oldest') {
        return new Date(a.date) - new Date(b.date);
      } else if (sortBy === 'title-asc') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'title-desc') {
        return b.title.localeCompare(a.title);
      }
      return 0;
    });

    return filtered;
  }, [posts, searchTerm, selectedCategory, sortBy]);


  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
    setDeleteMessage(''); // Clear previous messages
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    setShowDeleteModal(false);
    setDeleteMessage('');
    setMessageType('');

    try {
      // In a real app, you'd send a DELETE request to your backend
      console.log(`Deleting post with ID: ${postToDelete._id}`);
      let postsIds = posts.map(post => { return post._id })
      let newPostIdsList = postsIds.filter(postId => {
        if (postId !== postToDelete._id) {
          return postId
        }
      })

      await deleteBlogById(postToDelete._id)
      await updateUser(user._id, { posts: newPostIdsList })

      handleSoftReload()
      setPosts(posts.filter(post => post._id !== postToDelete._id));
      setDeleteMessage('Blog post deleted successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error deleting post:', error);
      setDeleteMessage('Failed to delete blog post. Please try again.');
      setMessageType('error');
    } finally {
      setPostToDelete(null);
      setTimeout(() => setDeleteMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPostToDelete(null);
  };

  return (
    <div className="animate-fade-in flex flex-col h-full"> {/* flex-col and h-full to manage internal layout */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 animate-fade-in-down">Your Published Blogs</h2>

      {deleteMessage && (
        <div className={`p-3 mb-4 rounded-md text-sm font-medium animate-fade-in-down ${messageType === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'}`}>
          {deleteMessage}
        </div>
      )}

      {/* Filter and Sort Controls */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-[rgba(0,0,0,.2)] p-4 rounded-lg shadow-sm border">
        {/* Search Input */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-secondary mb-1">Search Blogs</label>
          <input
            type="text"
            id="search"
            placeholder="Search by title or excerpt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500  text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Category Filter */}
        <div>
          <label htmlFor="categoryFilter" className="block text-sm font-medium text-secondary mb-1">Filter by Category</label>
          <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500  text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-secondary mb-1">Sort By</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500  text-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Blog List - This div will be scrollable */}
      {filteredAndSortedPosts.length > 0 ? (
        <div className="flex-1 grid grid-cols-1 gap-6 pr-2"> {/* Added pr-2 for scrollbar */}
          {filteredAndSortedPosts.map((post) => (
            <div
              key={post._id}
              className="nested-card-bg rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:scale-[1.005] hover:shadow-lg border border-tertiary"
            >
              <div className="relative w-full sm:w-1/3 h-48 sm:h-auto overflow-hidden flex-shrink-0">
                <Image
                  src={post.imageURL}
                  alt={post.title}
                  fill
                  className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 15vw"
                />
              </div>
              <div className="p-4 flex-grow flex flex-col justify-between">
                <div>
                  <Link href={`/blogpost/${post.slug}`} passHref>
                    <h3 className="text-xl font-bold mb-1 text-primary hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-secondary mb-2">
                    {formatDate(post.date)} • {post.category}
                  </p>
                  <p className="text-base line-clamp-3 text-primary">
                    {post.excerpt}
                  </p>
                </div>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleDeleteClick(post)}
                    className="flex-1 px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-md text-sm font-semiboldtransition duration-200 transform active:scale-95"
                  >
                    <svg className="w-4 h-4 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary py-8 flex-1 flex items-center justify-center">
          No blogs found matching your criteria.
          {searchTerm || selectedCategory !== 'All' ? (
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSortBy('newest'); }}
              className="ml-2 text-blue-600 hover:underline font-semibold"
            >
              Clear Filters
            </button>
          ) : (
            <>
              Why not <Link href="/profile/add-blog" className="text-blue-600 hover:underline font-semibold">add your first one</Link>?
            </>
          )}
        </p>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && postToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="nested-card-bg p-8 rounded-lg shadow-2xl text-center max-w-sm mx-4 border border-tertiary transform scale-95 animate-scale-in">
            <h3 className="text-xl font-bold text-primary mb-4">Confirm Deletion</h3>
            <p className="text-secondary mb-6">
              Are you sure you want to delete the blog post: <br />
              <span className="font-semibold text-blue-600">&quot;{postToDelete.title}&quot;</span>?
              This action cannot be undone.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-6 py-2 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition duration-300 transform hover:scale-105 active:scale-95"
              >
                Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-6 py-2 bg-gray-300 text-gray-800 rounded-full font-semibold hover:bg-gray-400 transition duration-300 transform hover:scale-105 active:scale-95 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
