"use client";

import { findAllUsers } from '@/lib/actions/findUser';
import Link from "next/link";
import React, { useState, useEffect } from 'react';

const WriterSlider = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [famousWriters, setFamousWriters] = useState([])
    useEffect(() => {
        findAllUsers().then(users => {
            setFamousWriters(users)
            setIsLoading(false)
        })
    }, [])

    // State to manage the currently active (center) slide index
    const [currentIndex, setCurrentIndex] = useState(0);
    // State to store the current window width for responsive calculations
    const [windowWidth, setWindowWidth] = useState(0);

    // Effect to update windowWidth on mount and resize
    useEffect(() => {
        // Set initial width
        setWindowWidth(window.innerWidth);

        // Event listener for window resize
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Navigate to the previous slide, looping to the end if at the beginning
    const goToPrevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? famousWriters.length - 1 : prevIndex - 1
        );
    };

    // Navigate to the next slide, looping to the beginning if at the end
    const goToNextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === famousWriters.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Function to calculate dynamic inline styles for each slide based on windowWidth
    const getSlideStyles = (index) => {
        const total = famousWriters.length;
        const prevIndex = (currentIndex - 1 + total) % total; // Index of the slide to the left
        const nextIndex = (currentIndex + 1) % total;       // Index of the slide to the right

        const isLargeScreen = windowWidth >= 1024; // Tailwind's 'lg' breakpoint
        const isMediumScreen = windowWidth >= 768 && windowWidth < 1024; // Tailwind's 'md' breakpoint

        let translateX = '-50%'; // Base for horizontal centering
        let scale = 1;
        let opacity = 0;
        let zIndex = 1;
        let visibility = 'hidden';
        let width;

        // Determine base width for the card based on screen size
        if (isLargeScreen) {
            width = 'calc(100% / 3 - 2rem)'; // Approx 1/3 width with gap
        } else if (isMediumScreen) {
            width = 'calc(100% / 2 - 1rem)'; // Approx 1/2 width with gap
        } else {
            // Small screen width - center slide will be 90%
            width = '90%';
        }

        if (index === currentIndex) {
            opacity = 1;
            zIndex = 10;
            visibility = 'visible';
            scale = isLargeScreen ? 1.1 : 1;
        } else if (index === prevIndex) {
            opacity = 0.8; // Always visible and faded
            zIndex = 5;
            visibility = 'visible';

            if (isLargeScreen) {
                translateX = 'calc(-150% - 2rem)';
                scale = 0.9;
            } else if (isMediumScreen) {
                translateX = 'calc(-100% - 1rem)';
                scale = 0.95;
            } else { // Small screen: make previous slide visible but scaled down and pushed left
                translateX = 'calc(-120% - 0.5rem)'; // Adjust to fit on small screen
                scale = 0.7; // More significant scale down
                opacity = 0.6; // More faded
                zIndex = 3; // Slightly behind medium screen side slides
            }
        } else if (index === nextIndex) {
            opacity = 0.8; // Always visible and faded
            zIndex = 5;
            visibility = 'visible';

            if (isLargeScreen) {
                translateX = 'calc(50% + 2rem)';
                scale = 0.9;
            } else if (isMediumScreen) {
                translateX = 'calc(0% + 1rem)';
                scale = 0.95;
            } else { // Small screen: make next slide visible but scaled down and pushed right
                translateX = 'calc(20% + 0.5rem)'; // Adjust to fit on small screen
                scale = 0.7; // More significant scale down
                opacity = 0.6; // More faded
                zIndex = 3; // Slightly behind medium screen side slides
            }
        } else { // All other hidden slides
            translateX = '-9999px'; // Push far away
            opacity = 0;
            zIndex = 1;
            visibility = 'hidden';
            scale = 0.8; // Keep scale consistent for hidden slides
        }

        return {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(${translateX}, -50%) scale(${scale})`, // Combine transforms
            transition: 'all 0.5s ease-in-out',
            opacity: opacity,
            zIndex: zIndex,
            visibility: visibility,
            width: width,
            maxWidth: '300px', // Max width for individual cards
            minWidth: '250px', // Min width for individual cards
        };
    };

    return (
        <div className="relative w-full max-w-7xl mx-auto py-16 px-4 overflow-hidden">
            {/* Navigation Buttons */}
            <button
                onClick={goToPrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Previous slide"
            >
                &#8592; {/* Left Arrow */}
            </button>
            <button
                onClick={goToNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg z-20 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Next slide"
            >
                &#8594; {/* Right Arrow */}
            </button>

            {/* Slider Container - Fixed height is crucial for absolute positioning of children */}
            {/* Reduced height slightly and ensured content is centered within the card */}
            <div className="relative w-full h-[380px] lg:h-[420px] flex justify-center items-center">
                {famousWriters.length >= 3 && (
                    famousWriters.map((writer, index) => (
                        <Link
                        href={`/user-profile/${writer._id.toString()}`}
                            key={index}
                            // Apply dynamic inline styles directly
                            style={getSlideStyles(index)}
                            className="p-4 rounded-lg shadow-xl flex flex-col items-center justify-center text-center h-full
                                       border border-blue-700 bg-surface
                                       transform transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl"
                        >
                            <img
                                src={writer.imageUrl}
                                alt={writer.name}
                                className="w-20 h-20 rounded-full object-cover mb-3 border-4 border-blue-400"
                            />
                            <h2 className="text-2xl font-bold mb-1 text-primary">{writer.role}</h2>
                            <p className="text-xs font-semibold text-secondary dark:text-gray-300 mb-1">{writer.qualifications}</p>
                            <p className="text-sm text-tertiary dark:text-gray-400">{writer.bio}</p>
                        </Link>
                    ))
                )}

                {(!isLoading && famousWriters.length < 3) && (
                    <p className="text-center text-secondary dark:text-gray-300">
                        Please add at least 3 writers for the slider to display correctly.
                    </p>
                )}

                {isLoading && (
                    <div className="text-center text-3xl text-blue-600 animate-pulse">
                        Loading.......
                    </div>
                )}
            </div>
        </div>
    );
};

export default WriterSlider;
