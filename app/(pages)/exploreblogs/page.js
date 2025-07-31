import React from 'react';
import Link from 'next/link';
import BlogGrid from '@/components/BlogGrid';
import { fetchAllBlogs } from '@/lib/actions/fetchBlogs';

export default async function ExploreBlogsPage() {
  const blogPosts = JSON.parse(JSON.stringify((await fetchAllBlogs())))

  return (
    <>
      <main className="min-h-screen" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color-primary)' }}>
        {/* Hero Section for Explore Blogs */}
        <div className="relative flex flex-col items-center justify-center py-20 px-4 md:px-[20px] xl:px-[10vw] rounded-b-lg overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl">
          <div className="absolute inset-0 z-0 opacity-10">
            {/* Subtle background animation elements */}
            <div className="animate-pulse-slow absolute top-1/4 left-1/4 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="animate-pulse-slow animation-delay-2000 absolute bottom-1/3 right-1/3 w-40 h-40 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
          </div>
          <div className="relative z-10 text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 drop-shadow-lg">
              Dive into Our <span className="font-extrabold bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">Latest Blogs</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Uncover insightful articles, captivating stories, and expert perspectives across a multitude of topics.
            </p>
            <Link href="#blog-grid" passHref>
              <button className="px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-full shadow-lg hover:bg-blue-100 transition duration-300 transform hover:scale-105 group relative overflow-hidden">
                Start Reading
                <span className="absolute top-0 left-0 w-full h-full border-2 border-white rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="absolute top-0 left-0 w-full h-full border-2 border-white rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out delay-150"></span>
              </button>
            </Link>
          </div>
        </div>

        <BlogGrid blogPosts={blogPosts} />
      </main>
    </>
  );
}
