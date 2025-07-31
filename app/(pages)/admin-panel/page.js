"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Users, BookText, Trash2, Loader2, CheckCircle, XCircle, Calendar, Link as L, Image as ImageIcon, X } from 'lucide-react';
import gsap from 'gsap';
import { decodeJWT } from '@/lib/actions/jwt_token';
import { findAllUsers, findUserById } from '@/lib/actions/findUser';
import { fetchAllBlogs, fetchBlogById } from '@/lib/actions/fetchBlogs';
import updateUser, { deleteUserById } from '@/lib/actions/updateUser';
import deleteBlogById from '@/lib/actions/deleteBlogById';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Helper for Date Formatting ---
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  } catch (e) {
    return 'Invalid Date';
  }
};

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message, confirmText = "Confirm", cancelText = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm transition-opacity duration-300 opacity-100" onClick={onClose}></div>
      <div className="relative login-form-bg rounded-xl shadow-2xl p-8 md:p-10 w-full max-w-sm mx-auto text-center transform transition-all duration-300 ease-out opacity-100 scale-100">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-primary hover:text-blue-600 transition-colors duration-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Close"
        >
          <X size={24} />
        </button>
        <div className="mb-6 flex justify-center">
          <Trash2 size={48} className="text-red-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
          Are you sure?
        </h2>
        <p className="text-lg text-secondary mb-8 leading-relaxed">
          {message}
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={onConfirm}
            className="w-full bg-red-600 text-white py-3 rounded-md font-semibold text-lg
                       hover:bg-red-700 transition-all duration-300 transform hover:scale-[1.01]
                       shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-login-form-bg"
          >
            {confirmText}
          </button>
          <button
            onClick={onClose}
            className="w-full bg-transparent border border-gray-300 dark:border-gray-600 text-primary py-3 rounded-md font-semibold text-lg
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200
                       focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-login-form-bg"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function AdminPanel() {
  const router = useRouter()

  const [activeTab, setActiveTab] = useState('users'); // 'users' or 'blogs'
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', message: string }
  // Fetching UserPayload
  const [userPayload, setUserPayload] = useState("authorizing")

  useEffect(() => {
    async function func() {
      const payload = await decodeJWT()
      return payload
    }
    func().then((payload) => {
      setUserPayload(payload)
    })
  }, [])

  // State for confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null); // Stores the ID of the item to delete
  const [deleteType, setDeleteType] = useState(''); // 'user' or 'post'

  // Refs for GSAP animations
  const panelRef = useRef(null);
  const headerRef = useRef(null);

  // GSAP animation for panel entry
  useEffect(() => {
    // gsap.registerPlugin(ScrollTrigger);
    if (panelRef.current) {
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)", delay: 0.3 }
      );
    }
  }, []);


  // Fetch data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      setNotification(null); // Clear previous notifications

      try {
        if (activeTab === 'users') {
          const data = await findAllUsers()
          setUsers(data)
        } else { // activeTab === 'blogs'
          const data = await fetchAllBlogs({})
          setPosts(data)
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message || "Failed to load data. Check console for details.");
        setNotification({ type: 'error', message: err.message || "Failed to load data." });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]); // Re-fetch when activeTab changes

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    setShowConfirmModal(false); // Close modal immediately

    if (userPayload.email !== "sameersharm1234@gmail.com") {
      alert("You aren't permitted to modify anything.")
      return
    }
    if (!itemToDelete || !deleteType) return;

    setLoading(true); // Show loading spinner during deletion
    setError(null);
    setNotification(null);

    try {
      if (deleteType === 'user') {
        const mongoUser = await findUserById(itemToDelete)
        mongoUser.posts.forEach(postId => {
          deleteBlogById(postId)
        });
        mongoUser.following.forEach(async (followingId) => {
          updateUser(followingId, {
            followers: (await findUserById(followingId)).followers.filter(id => {
              if (id !== itemToDelete) {
                return id
              }
            })
          })
        });
        mongoUser.followers.forEach(async (followerId) => {
          updateUser(followerId, {
            following: (await findUserById(followerId)).following.filter(id => {
              if (id !== itemToDelete) {
                return id
              }
            })
          })
        });

        await deleteUserById(itemToDelete)

        setUsers(users.filter(user => user._id !== itemToDelete));
        setNotification({ type: 'success', message: 'User removed successfully!' });
      } else if (deleteType === 'post') {
        let userId = (await fetchBlogById(itemToDelete)).userId
        await updateUser(userId, {
          posts: (await findUserById(userId)).posts.filter((postId) => {
            if (postId !== itemToDelete) {
              return postId
            }
          })
        })

        await deleteBlogById(itemToDelete)

        setPosts(posts.filter(post => post._id !== itemToDelete));
        setNotification({ type: 'success', message: 'Blog post removed successfully!' });
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      setError(err.message || `Failed to remove ${deleteType}.`);
      setNotification({ type: 'error', message: err.message || `Failed to remove ${deleteType}.` });
    } finally {
      setLoading(false);
      setItemToDelete(null);
      setDeleteType('');
    }
  };

  // Function to open the confirmation modal
  const openConfirmModal = (id, type) => {
    setItemToDelete(id);
    setDeleteType(type);
    setShowConfirmModal(true);
  };

  const handleUserRoleChange = (id) => {
    if (userPayload?.email === "sameersharm1234@gmail.com") {
      const input = prompt("Choose role from ['admin', 'writer', 'spectator']: ")
      if (input) {
        updateUser(id, { role: input }).then(() => {
          router.refresh()
          alert("Role Updated Succesfully.")
        })
      }
    } else {
      alert("You aren't pemitted to do this action!")
    }
  }

  const LinkSVG = () => {
    return (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        className="bg-blue-600 p-1 rounded text-white w-8 h-8"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M10.59 13.41a1.995 1.995 0 0 1 0-2.82l2.83-2.83a2 2 0 1 1 2.83 2.83L13.41 13.4a1.995 1.995 0 0 1-2.82.01zm2.82-10.83a5 5 0 0 0-7.07 0L3.51 5.41a5 5 0 0 0 7.07 7.07l1.41-1.41a1 1 0 0 0-1.41-1.41l-1.41 1.41a3 3 0 0 1-4.24-4.24L7.76 4.17a3 3 0 0 1 4.24 0 1 1 0 0 0 1.41-1.41zM20.49 18.59l-4.24 4.24a5 5 0 0 1-7.07-7.07l1.41-1.41a1 1 0 0 1 1.41 1.41l-1.41 1.41a3 3 0 0 0 4.24 4.24l4.24-4.24a3 3 0 0 0-4.24-4.24 1 1 0 0 1-1.41-1.41 5 5 0 0 1 7.07 7.07z" />
      </svg>
    )
  }

  return (
    <>
      {userPayload === "authorizing" && (
        <>
          <div className='text-4xl md:text-7xl font-semibold text-blue-600 h-[100dvh] w-full flex justify-center items-center animate-pulse'>Authorizing.........</div>
        </>
      )}

      {(userPayload && userPayload?.role === "admin") && (
        <main ref={panelRef} className="min-h-screen py-16 px-4 md:px-[20px] text-primary">
          <div className="max-w-6xl mx-auto rounded-lg shadow-xl p-8 md:p-12 login-form-bg">
            <h1 ref={headerRef} className="text-4xl md:text-5xl font-extrabold leading-tight mb-8 text-blue-600 text-center">
              Admin Panel
            </h1>

            {/* Notification Area */}
            {notification && (
              <div className={`p-4 mb-6 rounded-md flex items-center justify-between
              ${notification.type === 'success' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'}
              transition-opacity duration-300 opacity-100 animate-fade-in`}
              >
                <div className="flex items-center">
                  {notification.type === 'success' ? <CheckCircle size={20} className="mr-2" /> : <XCircle size={20} className="mr-2" />}
                  <div className="font-medium text-white">{notification.message}</div>
                </div>
                <button onClick={() => setNotification(null)} className="text-current hover:opacity-75">
                  <X size={20} />
                </button>
              </div>
            )}

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-300 dark:border-gray-700 mb-8">
              <button
                onClick={() => setActiveTab('users')}
                className={`flex-1 py-3 px-4 text-lg font-semibold rounded-t-lg transition-colors duration-200
                ${activeTab === 'users' ? 'bg-blue-600 text-white shadow-md' : 'text-primary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <Users size={20} className="inline-block mr-2" /> Users
              </button>
              <button
                onClick={() => setActiveTab('blogs')}
                className={`flex-1 py-3 px-4 text-lg font-semibold rounded-t-lg transition-colors duration-200
                ${activeTab === 'blogs' ? 'bg-blue-600 text-white shadow-md' : 'text-primary hover:bg-gray-100 dark:hover:bg-gray-700'}`}
              >
                <BookText size={20} className="inline-block mr-2" /> Blogs
              </button>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-10 text-blue-600">
                <Loader2 size={48} className="animate-spin mr-3" />
                <p className="text-xl">Loading {activeTab}...</p>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="text-center py-10 text-red-600">
                <div className="text-xl font-semibold">Error: {error}</div>
                <div className="text-lg text-secondary mt-2">Please check your network and API routes.</div>
              </div>
            )}

            {/* Users List */}
            {!loading && !error && activeTab === 'users' && (
              <div className="space-y-4">
                {users.length === 0 ? (
                  <p className="text-center text-lg text-secondary py-10">No users registered yet.</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Role</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Bio</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Followers</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Posts</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Joined On</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} className="border-b border-gray-200 bg-surface last:border-b-0 hover:bg-gray-50">
                            <td className="py-3 px-4 text-primary text-base whitespace-nowrap">
                              <div className="flex items-center text-wrap">
                                <img src={user.profilePicture} alt="Profile" className="w-8 h-8 rounded-full mr-2 object-cover" />
                                {user.name}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-secondary text-base">{user.email}</td>
                            <td className="py-3 px-4 text-tertiary text-base capitalize">
                              <button onClick={() => handleUserRoleChange(user._id)} className='hover:underline'>
                                {user.role}
                              </button>
                            </td>
                            <td className="py-3 px-4 text-secondary text-base text-wrap max-w-[200px] truncate" title={user.bio}>{user.bio}</td>
                            <td className="py-3 px-4 text-secondary text-base">{user.followers ? user.followers.length : 0}</td>
                            <td className="py-3 px-4 text-secondary text-base">{user.posts ? user.posts.length : 0}</td>
                            <td className="py-3 px-4 text-secondary text-base whitespace-nowrap">{formatDate(user.createdAt)}</td>
                            <td className="flex items-center justify-center gap-1 py-3 px-4">
                              <button
                                onClick={() => openConfirmModal(user._id, 'user')}
                                className="bg-red-500 cursor-pointer text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label={`Remove user ${user.name}`}
                              >
                                <Trash2 size={18} />
                              </button>
                              <Link href={`/user-profile/${user._id.toString()}`} target='_blank' passHref className='cursor-pointer'>
                                <LinkSVG />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Blogs List */}
            {!loading && !error && activeTab === 'blogs' && (
              <div className="space-y-4">
                {posts.length === 0 ? (
                  <p className="text-center text-lg text-secondary py-10">No blog posts found.</p>
                ) : (
                  <div className="overflow-x-auto rounded-lg shadow-md">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Title</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Author</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Category</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Slug</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Excerpt</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Image</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Created/Updated</th>
                          <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {posts.map((post) => (
                          <tr key={post._id} className="border-b border-gray-200 bg-surface last:border-b-0 hover:bg-gray-50">
                            <td className="py-3 px-4 text-primary text-base text-wrap max-w-[200px] truncate" title={post.title}>{post.title}</td>
                            <td className="py-3 px-4 text-secondary text-base">{post.author}</td>
                            <td className="py-3 px-4 text-tertiary text-base capitalize">{post.category || 'N/A'}</td>
                            <td className="py-3 px-4 text-secondary text-base max-w-[150px] truncate">
                              <Link href={`/blogpost/${post.slug}`} target="_blank" className="text-blue-500 hover:underline flex items-center text-wrap">
                                <L size={60} className="mr-1.5 inline-block" /> {post.slug}
                              </Link>
                            </td>
                            <td className="py-3 px-4 text-secondary text-base max-w-[250px] truncate" title={post.excerpt}>{post.excerpt}</td>
                            <td className="py-3 px-4">
                              {post.imageURL ? (
                                <img src={post.imageURL} alt="Post Thumbnail" className="w-10 h-10 object-cover rounded" />
                              ) : (
                                <ImageIcon size={24} className="text-gray-400" />
                              )}
                            </td>
                            <td className="py-3 px-4 text-secondary text-base whitespace-nowrap">
                              <Calendar size={14} className="inline-block mr-1 text-gray-500" />{formatDate(post.date)}
                              {post.updatedAt && (post.updatedAt !== post.createdAt) && (
                                <span className="block text-xs text-tertiary">Updated: {formatDate(post.updatedAt)}</span>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <button
                                onClick={() => openConfirmModal(post._id, 'post')}
                                className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
                                aria-label={`Remove post ${post.title}`}
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Confirmation Modal */}
          <ConfirmationModal
            isOpen={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleDeleteConfirm}
            message={`Are you sure you want to remove this ${deleteType}? This action cannot be undone.`}
            confirmText={`Yes, Remove ${deleteType === 'user' ? 'User' : 'Post'}`}
            cancelText="No, Keep It"
          />
        </main>
      )}

      {(userPayload !== "authorizing" && userPayload?.role !== "admin") && (
        <div className='text-4xl md:text-7xl font-bold text-blue-600 h-[100dvh] w-full flex justify-center items-center'>Access Denied!</div>
      )}

      {!userPayload && (
        <div className='text-4xl md:text-7xl font-bold text-blue-600 h-[100dvh] w-full flex justify-center items-center'>Please Login!</div>
      )}
    </>
  );
}