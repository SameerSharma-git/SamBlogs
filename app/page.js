import Image from "next/image";
import Link from "next/link";
import WriterSlider from "@/components/WriterSlider";

export default function Home({}) {

  return (
    <>
      <main className="">
        {/* Hero Section for SamBlogs */}
        <div id="home" className="flex flex-col md:flex-row items-center justify-center py-16 md:px-[20px] xl:px-[10vw] rounded-lg w-full">
          <div className="md:w-1/2 text-center md:text-left md:pr-8 mb-8 md:mb-0">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 text-primary">
              Welcome to <div className="text-blue-600">SamBlogs</div>
            </h1>
            <p className="text-xl md:text-2xl text-secondary mb-6">
              Your go-to source for insightful content on <br />
              {/* Removed Type.js span as Type.js functionality is removed */}
            </p>
            {/* Container for the quote and button */}
            <div className="flex items-center justify-center md:justify-start mt-6">
              {/* Big double quote - now with added styling */}
              <span className="text-7xl md:text-8xl text-blue-400 font-extrabold mr-4 leading-none select-none drop-shadow-lg">"</span>
              <Link href={'/exploreblogs'} className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105
                                           relative overflow-hidden group"> {/* Added classes for border animation */}
                Explore Blogs
                {/* Animated border elements */}
                <span className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full
                                           transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                <span className="absolute top-0 left-0 w-full h-full border-2 border-blue-600 rounded-full
                                           transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out delay-150"></span>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/pexels-plann-2999237-4549414.jpg"
              alt="SamBlogs Hero Image"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>

        {/* Invite section */}
        <div id="community" className="flex flex-col md:flex-row md:w-[90vw] items-center justify-center py-16 px-4 md:px-7 bg-surface rounded-lg shadow-lg mx-auto transition-all duration-500 hover:scale-[1.005] hover:shadow-2xl border-2 border-blue-600">
          <div className="md:w-1/2 text-center md:text-left md:pr-8 mb-6 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-primary">
              Become a Part of Our <div className="text-blue-600">Blogging Family!</div>
            </h2>
            <p className="text-lg md:text-xl text-white mb-6">
              Whether you're a seasoned writer or just starting your blogging journey, SamBlogs is the perfect place to share your voice, connect with like-minded individuals, and discover amazing content. Join us today and let your ideas shine!
            </p>
            <Link href={"/community"} passHref>
              <button className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105">
                Join the Community
              </button>
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/images/pexels-markus-winkler-1430818-19813743.jpg"
              alt="Blogging Community Image"
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </div>
        </div>

        {/* Our Story */}
        <div id="about" className="flex flex-col items-center py-24 px-4 bg-primary rounded-lg mx-auto my-9 md:w-[85vw] transition-all duration-500">
          <div id="about" className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-7 text-primary">
              Our Journey: The <div className="text-blue-600">SamBlogs Story</div>
            </h2>
            <p className="text-lg md:text-xl text-secondary">
              SamBlogs was born from a simple yet profound idea: to cultivate a vibrant, inclusive space where diverse voices could not only be heard but truly resonate with the world. We firmly believe that every story holds unique value and deserves its moment in the spotlight, and that within every thoughtful idea lies the potent seed of inspiration. What began as a humble aspiration has blossomed into a thriving community, a dynamic hub where writers and readers alike connect over a shared passion for knowledge, authentic expression, and meaningful dialogue. We're more than just a blog; we're a collective journey of discovery, learning, and mutual growth, united by the power of shared perspectives.
            </p>
          </div>

          <h3 className="text-3xl md:text-4xl w-full font-bold mb-10 text-center">Meet Our <div className="text-blue-600 inline-block">Star Writers</div></h3>
          <WriterSlider />

        </div>
      </main>
    </>
  );
}