// components/profile/DashboardView.jsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardView({ user, formatDate, setSelectedView, handleOpenModal, setModalData, setTitle }) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl font-extrabold text-center md:mb-9 mb-6 animate-fade-in-down">
        Welcome back, <div className="text-blue-600 inline-block">{user.name.split(' ')[0]}!</div>
      </h1>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 animate-fade-in">
        <div className="bg-blue-600 p-5 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"> {/* Enhanced shadow and lift */}
          <div className="text-sm text-white font-medium uppercase tracking-wider">Member Since</div>
          <div className="text-3xl font-extrabold text-white mt-2">{formatDate(user.createdAt)}</div> {/* Larger text */}
        </div>
        <div className="bg-blue-600 p-5 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-sm text-white font-medium uppercase tracking-wider">Blogs Published</div>
          <div className="text-3xl font-extrabold text-white mt-2">{user.posts ? user.posts.length : 0}</div>
        </div>

        <button onClick={() => { setTitle("Your Followers"); handleOpenModal(); user?.followers && setModalData(user.followers); }} className="bg-blue-600 p-5 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-sm text-white font-medium uppercase tracking-wider">Followers</div>
          <div className="text-3xl font-extrabold text-white mt-2">{user.followers ? user.followers.length : 0}</div>
        </button>
        <button onClick={() => { setTitle("Your Following"); handleOpenModal(); user?.followers && setModalData(user.following); }} className="bg-blue-600 p-5 rounded-lg text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-sm text-white font-medium uppercase tracking-wider">Following</div>
          <div className="text-3xl font-extrabold text-white mt-2">{user.following ? user.following.length : 0}</div>
        </button>
      </div>

      {/* Your Recent Blogs Section */}
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 animate-fade-in-down">Your Recent Blogs</h2>
      {user.posts && user.posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
          {user.posts.slice(0, 4).map((post) => (
            <Link key={post._id} href={`/blogpost/${post.slug}`} passHref>
              <div
                className="nested-card-bg rounded-lg shadow-md overflow-hidden flex flex-col sm:flex-row transition-all duration-300 hover:scale-[1.01] hover:shadow-xl group cursor-pointer border border-tertiary" /* Enhanced shadow */
              >
                <div className="relative w-full sm:w-1/3 h-40 sm:h-auto overflow-hidden flex-shrink-0">
                  <Image
                    src={post.imageURL}
                    alt={post.title}
                    fill
                    className="object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 15vw"
                  />
                </div>
                <div className="p-4 flex-grow nested-card-bg">
                  <h3 className="text-lg font-bold mb-1 text-primary group-hover:text-blue-500 transition-colors duration-300">{post.title}</h3>
                  <p className="text-xs text-secondary mb-2">{formatDate(post.date)} • {post.category}</p>
                  <p className="text-sm line-clamp-2 text-primary">{post.excerpt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-secondary py-8">You haven't published any blogs yet. Why not <button onClick={() => setSelectedView('add-blog')} className="text-blue-600 hover:underline inline-block font-semibold">add your first one</button>?</p>
      )}

      {user.posts && user.posts.length > 4 && (
        <div className="text-center mt-10 animate-fade-in">
          <button
            onClick={() => { setSelectedView('your-blogs') }}
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.005] active:scale-95"
          >
            View All Your Blogs
          </button>
        </div>
      )}
    </>
  );
}
