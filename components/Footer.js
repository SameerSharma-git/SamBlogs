import React from 'react';
import Link from 'next/link';
import { Home, Info, Mail, Book, Twitter, Linkedin, Github } from 'lucide-react'; // Importing icons for navigation and social media

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 sm:px-6 lg:px-8 rounded-t-xl shadow-lg">
      <div className="max-w-7xl mx-auto grid place-items-center grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Section 1: Blog Title and Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-2xl font-bold text-white mb-4">SamBlogs</h4>
          <div className="text-sm text-white">
            &copy; {currentYear} SamBlogs. All rights reserved.
          </div>
          <div className="text-sm mt-2">
            Your daily dose of insights and stories.
          </div>
        </div>

        {/* Section 2: Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <nav className="space-y-2">
            {/* Using simple anchor tags as Next.js App Router handles client-side navigation */}
            <Link href="/#home" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out rounded-md p-1">
              <Home className="h-5 w-5 mr-2" /> Home
            </Link>
            <Link href="/#about" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out rounded-md p-1">
              <Info className="h-5 w-5 mr-2" /> About
            </Link>
            <Link href="/contact" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out rounded-md p-1">
              <Mail className="h-5 w-5 mr-2" /> Contact
            </Link>
            <Link href="/privacy-policy" className="flex items-center justify-center md:justify-start text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out rounded-md p-1">
              <Book className="h-5 w-5 mr-2" /> Privacy Policy
            </Link>
          </nav>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="text-lg font-semibold text-white mb-4">Connect With Us</h4>
          <div className="flex space-x-4">
            {/* Social media icons with hover effects */}
            <Link href={'/'} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
              <Twitter className="h-7 w-7" />
            </Link>
            <Link href={'/'} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
              <Linkedin className="h-7 w-7" />
            </Link>
            <Link href="https://github.com/SameerSharma-git" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400 transition duration-300 ease-in-out transform hover:scale-110">
              <Github className="h-7 w-7" />
            </Link>
          </div>
          {/* Optional: Add a newsletter signup or contact info */}
          <div className="text-sm mt-4">
            Stay updated with our latest posts!
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
