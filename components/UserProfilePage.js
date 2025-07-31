// components/UserProfilePage.jsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useState } from "react";
import ButtonDiv from "./userProfileComponents/ButtonDiv";
import ModalComponent from "./ModalComponent";

// Helper function to format dates
const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), "MMM dd, yyyy");
  } catch (error) {
    console.error("Error formatting date:", dateString, error);
    return dateString; // Return original if invalid
  }
};

// Blog card component for reusability
const UserBlogCard = ({ post }) => (
  <Link href={`/blogpost/${post.slug}`} passHref>
    <div className="bg-surface rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group border border-surface">
      <div className="relative w-full h-48 md:h-56 overflow-hidden">
        <Image
          src={post.imageURL || '/images/default-blog-image.jpg'} // Fallback image
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-5">
        <div className="text-xs px-3 py-2 mb-5 text-white rounded-full w-fit bg-blue-600 uppercase block tracking-wider">
          {post.category}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 leading-tight">
          {post.title}
        </h3>
        <p className="text-secondary text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <div className="inline-block text-tertiary text-xs">
          {formatDate(post.date)}
        </div>
      </div>
    </div>
  </Link>
);

const INITIAL_POSTS_DISPLAY = 6; // How many posts to show initially
const POSTS_LOAD_INCREMENT = 6; // How many posts to load/hide with each button click

export default function UserProfilePage({ user, fromUserPayload }) {
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null)
  const [title, setTitle] = useState("Title")

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // State to manage the number of visible posts
  const [visiblePosts, setVisiblePosts] = useState(INITIAL_POSTS_DISPLAY);

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center text-primary">Loading user profile...</div>;
  }

  // Slice the posts array to show only the visible ones
  const postsToShow = user.posts.slice(0, visiblePosts);
  const hasMorePosts = user.posts.length > visiblePosts;
  // Can show less if we're currently showing more than the initial count
  const canShowLess = visiblePosts > INITIAL_POSTS_DISPLAY;

  const handleShowMore = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + POSTS_LOAD_INCREMENT);
  };

  const handleShowLess = () => {
    // Ensure we don't go below the initial display count
    setVisiblePosts((prevVisiblePosts) =>
      Math.max(INITIAL_POSTS_DISPLAY, prevVisiblePosts - POSTS_LOAD_INCREMENT)
    );
  };

  return (
    <>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
        modalData={modalData}
      />

      <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header Section */}
          <section className="bg-surface rounded-2xl shadow-xl p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8 border-2 border-blue-600 transition-all duration-500 hover:scale-[1.002] hover:shadow-2xl">
            <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg border-4 border-blue-400 transform transition-transform duration-300 hover:scale-105">
              <Image
                src={user.profilePicture}
                alt={`${user.name}'s profile picture`}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>

            <div className="text-center md:text-left flex-grow">
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-2 flex items-center justify-center md:justify-start">
                {user.name}
                {user.role === 'writer' && (
                  <div className="ml-3 px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md animate-pulse">
                    Writer
                  </div>
                )}
              </h1>
              <p className="text-xl text-blue-600 font-semibold mb-4">{user.email}</p>

              <p className="text-secondary text-lg mb-6 leading-relaxed">
                {user.bio}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4 text-tertiary">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{user.posts.length}</span>
                  <span className="text-sm">Blogs Written</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{user.followers.length}</span>
                  <span className="text-sm">Followers</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-primary">{user.following.length}</span>
                  <span className="text-sm">Following</span>
                </div>
              </div>

              {/* Optional: Follow/Message Buttons */}
              <ButtonDiv setTitle={setTitle} handleOpenModal={handleOpenModal} fromUserID={fromUserPayload?._id} toUserID={user._id} />
            </div>
          </section>

          {/* User's Blogs Section */}
          <section className="mt-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary text-center mb-9">
              Blogs by <div className="text-blue-600 inline-block">{user.name}</div>
            </h2>
            <div className="w-[98%] md:w-[85%] h-0.5 mx-auto mb-12 bg-blue-600"></div>

            {user.posts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {postsToShow.map((post) => (
                    <UserBlogCard key={post._id} post={post} />
                  ))}
                </div>
                <div className="flex justify-center mt-12 gap-4">
                  {canShowLess && (
                    <button
                      onClick={handleShowLess}
                      className="px-8 py-3 bg-gray-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-gray-600 transition duration-300 transform hover:scale-105"
                    >
                      Show Less
                    </button>
                  )}
                  {hasMorePosts && (
                    <button
                      onClick={handleShowMore}
                      className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105 animate-bounce-slow"
                    >
                      Show More Blogs
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="text-center text-xl text-secondary py-10 bg-blogpost rounded-xl shadow-lg">
                {user.name} hasn't published any blogs yet. Stay tuned!
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
}