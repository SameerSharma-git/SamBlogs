"use server"
import Link from 'next/link';
import fetchBlogs from '@/lib/actions/fetchBlogs';

export default async function BlogPostPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  // Find the blog post that matches the slug from the imported data
  const fetchedBlog = (await fetchBlogs({slug}))[0]
  let blogPost;
  fetchedBlog ? blogPost = fetchedBlog.toObject(): blogPost = null

  const formattedDate = blogPost && (blogPost.date
    ? new Date(blogPost.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    : 'N/A')

  // If no blog post is found, render a 404-like message
  if (!blogPost) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-lg">The blog post you are looking for does not exist.</p>
          <Link href="/exploreblogs" passHref>
            <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
              Back to all blogs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen py-16 px-4 md:px-[20px] xl:px-[10vw]">
      <div className="max-w-4xl mx-auto rounded-lg shadow-xl overflow-hidden p-6 md:p-10 bg-blogpost">

        {/* Back to Blogs Link */}
        <Link href="/exploreblogs" passHref>
          <button className="inline-flex items-center text-blue-500 hover:text-blue-700 transition duration-300 mb-6">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to all blogs
          </button>
        </Link>

        {/* Featured Image */}
        {blogPost.imageURL && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-md">
            <img
              src={blogPost.imageURL}
              alt={blogPost.title}
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}

        {/* Blog Post Header */}
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          {blogPost.title}
        </h1>
        <div className="flex items-center text-sm mb-8 text-gray-600 dark:text-gray-300">
          <span className="mr-3 font-semibold underline"><Link href={`/user-profile/${blogPost.userId.toString()}`} target='_blank'>By {blogPost.author}</Link></span>
          <span>•</span>
          <span className="ml-3 font-semibold">{formattedDate}</span>
          {blogPost.category && (
            <>
              <span>•</span>
              <span className="span-cls ml-3 px-3 py-1 bg-blue-600 text-white rounded-full text-xs">{blogPost.category}</span>
            </>
          )}
        </div>

        {/* Blog Post Content */}
        <div
          // Increased font size from 'prose-lg' to 'prose-xl' for even better readability
          className="blogpost prose prose-xl max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        ></div>

      </div>
    </main>
  );
}
