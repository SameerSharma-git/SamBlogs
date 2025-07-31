"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import ModalComponent from '@/components/ModalComponent';

export default function ContactPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("Title")

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTitle('Thank you for your message! We will get back to you soon.')
    handleOpenModal()
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <ModalComponent
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      />

      <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-center mb-12 text-blue-600 animate-fade-in">
            Get In <div className="inline-block text-blue-600">Touch</div>
          </h1>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Contact Information Section */}
            <div className="lg:w-1/2 w-full bg-surface p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.005] border border-blue-200 animate-fade-in">
              <h2 className="text-3xl font-bold text-blue-700 mb-6">Our Details</h2>
              <p className="text-lg text-gray-700 mb-4">
                Have questions, feedback, or just want to say hello? We'd love to hear from you! Reach out to us through any of the methods below.
              </p>

              <div className="space-y-4 text-gray-600">
                <div className="flex items-center">
                  {/* Email Icon (using inline SVG for simplicity) */}
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 4v7a2 2 0 002 2h14a2 2 0 002-2v-7m-18 0l-1.664-1.11a2 2 0 00-2.22 0L3 12z"></path>
                  </svg>
                  <h3>Email: <div className="inline-block text-blue-600 hover:underline">info@samblogs.com</div></h3>
                </div>
                <div className="flex items-center">
                  {/* Phone Icon (using inline SVG for simplicity) */}
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.135a11.042 11.042 0 005.516 5.516l1.134-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                  </svg>
                  <h3>Phone: <div className="inline-block text-blue-600 hover:underline">+1 (234) 567-890</div></h3>
                </div>
                <div className="flex items-center">
                  {/* Location Icon (using inline SVG for simplicity) */}
                  <svg className="w-6 h-6 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m11.314 0A8.995 8.995 0 0112 20c-2.485 0-4.752-.833-6.657-2.25M17.657 16.657l-1.664-1.11a2 2 0 00-2.22 0L12 16.657m5.657 0a8.995 8.995 0 010-4.752m0 4.752L12 12m0 0l-1.664-1.11a2 2 0 00-2.22 0L6.343 16.657m-1.686-2.828a8.995 8.995 0 010-4.752m0 4.752L12 12m0 0L6.343 16.657m-1.686-2.828a8.995 8.995 0 010-4.752M12 12V3"></path>
                  </svg>
                  <h3 className='inline-block'>Address: 123 Blog Street, Content City, BC 12345</h3>
                </div>
              </div>
              <div className="mt-8 flex justify-center lg:justify-start">
                <Image
                  src={"data:image/jpeg;base64,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"}
                  alt="Contact Us Illustration"
                  width={400}
                  height={250}
                  objectFit="cover"
                  className="rounded-lg shadow-md"
                />
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="lg:w-1/2 w-full bg-surface p-8 rounded-xl shadow-2xl transform transition-transform duration-300 hover:scale-[1.005] border border-blue-200 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-3xl font-bold text-blue-700 mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                    className={`w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm
                             bg-gray-50 text-gray-900 placeholder-gray-400`}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    required
                    className={`w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm
                             bg-gray-50 text-gray-900 placeholder-gray-400`}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-semibold text-gray-700 mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message here..."
                    rows="6"
                    required
                    className={`w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm
                             bg-gray-50 text-gray-900 placeholder-gray-400 resize-y`}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-[1.01]
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
