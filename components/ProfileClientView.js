// components/ProfileClientView.jsx
"use client";

import React, { useState, useEffect } from 'react';
import ProfileSidebar from './profile/ProfileSlidebar';
import ProfileMainContent from './profile/ProfileMainContent';

export default function ProfileClientView({ user }) {

  const [selectedView, setSelectedView] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    // The main container now ensures it takes at least the full viewport height.
    // It's a flex container for its children, arranging them in a column then row.
    // The padding and gap are applied here for consistent spacing.
    <div className="h-screen flex flex-col md:flex-row p-1.5 gap-1.5 mt-3 mb-6 bg-background-primary text-text-primary">
      {/* Sidebar - flex-shrink-0 prevents it from shrinking on smaller screens (desktop) */}
      <ProfileSidebar
        user={user}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        selectedView={selectedView}
        setSelectedView={setSelectedView}
      />

      {/* Main Content Area - flex-1 allows it to grow and fill available space.
          The actual scrolling will happen within an inner div inside ProfileMainContent. */}
      <ProfileMainContent
        user={user}
        selectedView={selectedView}
        isMobileMenuOpen={isMobileMenuOpen}
        setSelectedView={setSelectedView}
      />

      {/* Mobile Menu Toggle Button (FAB) */}
      <button
        className={`md:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-xl z-40 transition-transform duration-300 hover:scale-110 active:scale-95`}
        onClick={toggleMobileMenu}
        aria-label="Toggle profile menu"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </button>
    </div>
  );
}
