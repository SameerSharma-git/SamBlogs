"use client"
import React, { useState } from 'react'
import Link from 'next/link'; // Make sure Link is imported

const BlogGrid = ({ blogPosts }) => {

    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest'); // 'newest', 'popular', 'az'

    const categories = ['All', 'Technology', 'Food', 'Wellness', 'Arts', 'Environment', 'Travel', 'Education', 'Science', 'Business', 'Sports', 'Health'];

    const filteredAndSortedPosts = blogPosts
        .filter(post => {
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === 'newest') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'az') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });

    return (
        <>
            {/* Search and Filter Section */}
            <section className="py-3 px-4 md:px-[20px] xl:px-[10vw] sticky top-0 z-20 shadow-md" style={{ backgroundColor: 'var(--bg-surface)' }}>
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-1/3">
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full p-3 pl-10 rounded-full border focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition duration-200 outline-none"
                            style={{
                                backgroundColor: 'var(--bg-surface)',
                                color: 'var(--text-color-primary)',
                                borderColor: 'var(--text-color-tertiary)'
                            }}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-color-secondary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>

                    {/* Categories - Now Scrollable */}
                    <div className="w-full md:w-1/2 flex flex-nowrap overflow-x-auto whitespace-nowrap gap-2 py-1 px-1 category-scroll-container">
                        {categories.map((category) => (
                            <button
                                key={category}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 border flex-shrink-0
                    ${selectedCategory === category
                                        ? 'bg-blue-600 text-white shadow-md transform scale-105'
                                        : 'hover:bg-blue-500 hover:text-white'
                                    }`}
                                style={{
                                    backgroundColor: selectedCategory === category ? '' : 'var(--bg-surface)',
                                    color: selectedCategory === category ? '' : 'var(--text-color-secondary)',
                                    borderColor: 'var(--text-color-tertiary)'
                                }}
                                onClick={() => setSelectedCategory(category)}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Sort By */}
                    <div className="relative w-full md:w-1/6">
                        <select
                            className="block appearance-none w-full py-3 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:border-blue-500 transition duration-200 cursor-pointer border"
                            style={{ backgroundColor: 'var(--bg-surface)', color: 'var(--text-color-primary)', borderColor: 'var(--text-color-tertiary)' }}
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="newest">Newest</option>
                            <option value="az">A-Z</option>
                            {/* <option value="popular">Most Popular</option> */}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2" style={{ color: 'var(--text-color-secondary)' }}>
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section id="blog-grid" className="py-16 px-4 md:px-[20px] xl:px-[10vw]">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedPosts.length > 0 ? (
                        filteredAndSortedPosts.map((post, index) => (
                            // Wrap the entire card with Next.js Link
                            <Link key={index} href={`/blogpost/${post.slug}`} passHref>
                                <div
                                    className="rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group cursor-pointer border"
                                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--text-color-tertiary)' }}
                                >
                                    <div className="relative w-full h-48 overflow-hidden">
                                        <img
                                            src={post.imageURL}
                                            alt={post.title}
                                            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                            <span className="text-xs font-semibold text-white bg-blue-600 px-3 py-1 rounded-full">{post.category}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 flex-grow">
                                        <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors duration-300">{post.title}</h3>
                                        <p className="text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                                        <div className="flex items-center text-xs">
                                            <span className="mr-3">{post.author}</span>
                                            <span className=''>•</span>
                                            <span className="ml-3">{(post.date
                                                ? new Date(post.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'N/A')}</span>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0">
                                        {/* Change this to a standard button as the whole card is now a link */}
                                        <button className="w-full px-6 py-2 bg-blue-600 text-white text-md font-semibold rounded-full shadow-md hover:bg-blue-700 transition duration-300 transform hover:scale-105 relative overflow-hidden group">
                                            Read More
                                            {/* These spans provide the hover animation, still relevant for button look */}
                                            <span className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                                            <span className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out delay-150"></span>
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <h2 className="col-span-full text-center text-2xl py-10">
                            No blog posts found matching your criteria.
                        </h2>
                    )}
                </div>
            </section>
        </>
    )
}

export default BlogGrid
