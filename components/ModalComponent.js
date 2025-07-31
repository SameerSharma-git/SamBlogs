"use client";

import React, { useEffect, useRef } from 'react';

export default function ModalComponent({ isOpen, onClose, title, modalData }) {
  // Ref for the modal content area to detect clicks outside
  const modalRef = useRef(null);
  console.log(modalData)

  // Effect to handle closing modal on Escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Optional: Disable body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleEscape);
      // Re-enable body scrolling when modal is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]); // Re-run effect when isOpen or onClose changes

  // If the modal is not open, don't render anything
  if (!isOpen) {
    return null;
  }

  return (
    // Modal Overlay (backdrop)
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[rgba(0,0,0,.7)] bg-opacity-50 backdrop-blur-sm animate-fade-in"
      onClick={onClose} // Close modal when clicking on the backdrop
    >
      {/* Modal Content */}
      <div
        ref={modalRef}
        className="bg-white rounded-xl shadow-2xl p-6 md:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 opacity-0 animate-scale-in"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 pb-4">
          <div className="text-3xl font-bold text-center text-blue-600">{title}</div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors duration-200 focus:outline-none"
            aria-label="Close modal"
          >
            {/* Close Icon (X) */}
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className={modalData?.length > 0 && "text-black rounded-md border-blue-600 border p-3"}>
          {modalData?.length > 0 ? (
            modalData.map((id) => {
              return id
            })
          ): <div className='h-0.5 w-full mx-auto bg-blue-600 rounded-full z-50'></div>}
        </div>
      </div>

      {/* Custom Animations (move to global CSS if preferred) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
