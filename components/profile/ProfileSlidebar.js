// components/profile/ProfileSidebar.jsx
"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfileSidebar({ user, isMobileMenuOpen, toggleMobileMenu, selectedView, setSelectedView }) {
  const menuItems = [
    { name: 'Dashboard', viewId: 'dashboard', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
    )},
    { name: 'Update Profile', viewId: 'update-profile', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
    )},
    { name: 'Add New Blog', viewId: 'add-blog', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
    )},
    { name: 'Your Blogs', viewId: 'your-blogs', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v10m2-6h2m-2 0h-2m2 0a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
    )},
    { name: 'Settings', viewId: 'settings', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.51-.18 1.05-.283 1.6-.283 1.55 0 2.98.54 4.1 1.45.626.54 1.157 1.18 1.583 1.9L21 10.42a1 1 0 010 1.16l-3.392 3.123c-.426.72-.957 1.36-1.583 1.9-1.12.91-2.55 1.45-4.1 1.45-.55 0-1.09-.103-1.6-.283a3.001 3.001 0 00-3.175 0c-.51.18-1.05.283-1.6.283-1.55 0-2.98-.54-4.1-1.45-.626-.54-1.157-1.18-1.583-1.9L3 10.42a1 1 0 010-1.16l3.392-3.123c.426-.72.957-1.36 1.583-1.9 1.12-.91 2.55-1.45 4.1-1.45z"></path></svg>
    )},
    { name: 'Logout', viewId: 'logout', icon: (
      <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
    ), href: '/api/auth/logout' },
  ];

  const handleMenuItemClick = (viewId, href) => {
    if (href) {
      return;
    }
    setSelectedView(viewId);
    toggleMobileMenu();
  };

  return (
    <aside
      className={`
        fixed md:relative top-0 left-0 h-full
        w-full md:w-64 lg:w-72 xl:w-80 2xl:w-96
        dashboard-panel-bg p-6 md:p-8
        rounded-lg
        shadow-2xl md:shadow-xl
        flex flex-col transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        z-50 md:z-auto
        overflow-y-auto md:overflow-y-auto /* Ensure scrolling for sidebar content */
        border-2 border-tertiary
        flex-shrink-0 md:flex-grow-0 /* Prevent shrinking on desktop, but allow it to take its fixed width */
      `}
    >
      {/* Close button for mobile */}
      <button
        className="md:hidden absolute top-4 right-4 text-text-primary hover:text-blue-600 z-10"
        onClick={toggleMobileMenu}
        aria-label="Close menu"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div className="flex flex-col items-center mb-10 mt-8 md:mt-0 text-center">
        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500 shadow-lg">
          <Image
            src={user.profilePicture}
            alt={`${user.name}'s profile picture`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 128px"
            priority
          />
        </div>
        <h1 className="text-3xl font-extrabold text-primary mb-1">{user.name}</h1>
        <p className="text-lg text-secondary mb-2">{user.email}</p>
        {user.role && user.role !== 'user' && (
          <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4 dark:bg-blue-900 shadow-sm">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
          </span>
        )}
        <p className="text-sm text-tertiary px-2 leading-relaxed">{user.bio}</p>
      </div>

      <nav className="flex-grow space-y-3 mt-4">
        {menuItems.map((item) => (
          item.href ? (
            <Link key={item.viewId} href={item.href} passHref>
              <button
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg font-medium
                  hover:bg-blue-600 hover:text-white transition duration-200
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group
                  ${selectedView === item.viewId ? 'bg-blue-600 text-white shadow-md' : 'text-text-primary'}
                `}
                onClick={() => handleMenuItemClick(item.viewId, item.href)}
              >
                {item.icon}
                <div className='inline-block'>{item.name}</div>
              </button>
            </Link>
          ) : (
            <button
              key={item.viewId}
              className={`
                w-full flex items-center px-4 py-3 rounded-lg font-medium
                hover:bg-blue-600 hover:text-white transition duration-200
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 group
                ${selectedView === item.viewId ? 'bg-blue-600 text-white shadow-md' : 'text-text-primary'}
              `}
              onClick={() => handleMenuItemClick(item.viewId)}
            >
              {item.icon}
              <div className='inline-block'>{item.name}</div>
            </button>
          )
        ))}
      </nav>
    </aside>
  );
}
