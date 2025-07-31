"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [triggerRevalidation, setTriggerRevalidation] = useState(1)

    useEffect(() => {
        if (pathname.startsWith('/dashboard')) {
            setTriggerRevalidation(triggerRevalidation + 1)
        }
    }, [pathname])

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => { setIsLoading(false) }, [])

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const res = await fetch('/api/auth/sessionJWTtoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // <-- THIS IS CRUCIAL
                    },
                    body: '',
                });

                const data = await res.json();
                setIsAuthenticated(data.isAuthenticated);
                console.log(data, isAuthenticated)
            } catch (error) {
                console.error('Failed to fetch auth status:', error);
                setIsAuthenticated(false); // Assume not authenticated on error
            }
        }
        checkAuthStatus()
        console.log("Checking AuthStatus")
    }, [triggerRevalidation])

    useEffect(() => {
        if (isMobileMenuOpen) {
            toggleMobileMenu()
        }
    }, [pathname])

    // State to manage the visibility of the mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // State for theme: false for light mode (sun icon initially), true for dark mode
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('isDarkMode') === "true") {
            setIsDarkMode(true)
        } else if (localStorage.getItem('isDarkMode') === "false") {
            setIsDarkMode(false)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    // Effect to apply the theme class to the body element
    useEffect(() => { if (!isLoading) document.body.classList.toggle('dark-theme') }, [isDarkMode]);

    // Function to toggle the mobile menu's visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleSignOutAction = () => {
        fetch("/api/auth/resettoken", { method: 'POST' })
            .then(() => {
                if (isMobileMenuOpen) toggleMobileMenu()

                router.push('/')
                setTriggerRevalidation(triggerRevalidation + 1)
            })
            .catch(() => alert("Couldn't Sign Out!!"))
    }

    return (
        <>
            {/* Navbar component */}
            <nav className={`bg-navbar-bg bg-opacity-50 backdrop-filter backdrop-blur-lg p-4  shadow-lg rounded-b-lg ${!(pathname.startsWith('/blogpost') || pathname.startsWith('/dashboard') || pathname.startsWith('/contact')) && 'sticky'} top-0 z-20`}>
                <div className="container mx-auto flex justify-between items-center">
                    {/* Brand/Logo (on the left) */}
                    <div className="text-2xl font-bold">
                        SamBlogs
                    </div>

                    {/* Desktop Navigation Links, Search Bar, and Theme Switch */}
                    <div className="hidden md:flex items-center">
                        <Link href="/#home" className="ml-auto hover:text-blue-400 transition duration-300">Home</Link>
                        <Link href="/exploreblogs" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Blogs</Link>
                        <Link href="/writers" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Writers</Link>
                        <Link href="/#about" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">About</Link>
                        <Link href="/contact" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Contact</Link>
                        {/* Login and Signup as unique buttons with less gap */}
                        {!isAuthenticated ? (
                            <div className="flex items-center gap-x-2 ml-4">
                                <Link href="/login" className={`px-4 py-2 ${pathname.startsWith("/login") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Login</Link>
                                <Link href={'/signup'} className={`px-4 py-2 ${pathname.startsWith("/signup") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Signup</Link>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-x-2 ml-4">
                                    <Link href="/dashboard" className={`px-4 py-2 ${pathname.startsWith("/dashboard") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Dashboard</Link>
                                </div>
                                <div className="flex items-center gap-x-2 ml-2">
                                    <button onClick={handleSignOutAction} className={`px-4 py-2 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Sign Out</button>
                                </div>
                            </>
                        )}

                        {/* <div className="relative ml-3">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-2 pl-10 rounded-md bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div> */}
                        {/* Theme Switch SVG Icon - now toggles based on isDarkMode state */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300 ml-3">
                            {isDarkMode ? (
                                // Sun icon for light mode when currently in dark mode
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
                                </svg>
                            ) : (
                                // Moon icon for dark mode when currently in light mode
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hamburger) and Theme Switch for mobile */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Theme Switch SVG Icon for Mobile - now toggles based on isDarkMode state */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300">
                            {isDarkMode ? (
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                        <button
                            id="mobile-menu-button"
                            className=" focus:outline-none p-2 rounded-md hover:bg-gray-700 transition duration-300"
                            onClick={toggleMobileMenu} // Attach click handler for menu toggle
                        >
                            {/* Hamburger Icon (Inline SVG) */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Div (Side Screen) - Slides from right */}
            <div
                id="mobile-menu"
                className={`fixed top-0 right-0 w-[65vw] h-full bg-navbar-bg bg-opacity-90 bg-surface z-50
                            transform transition-transform duration-300 ease-in-out
                            md:hidden flex flex-col items-center pt-[100px] space-y-6 overflow-y-auto
                            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Close button for the sliding menu (cross SVG) */}
                <button onClick={toggleMobileMenu} className="absolute top-4 left-4  p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Mobile Navigation Links - Adjusted for column layout and impressive styling */}
                <Link href="/#home" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Home</Link>
                <Link href="/exploreblogs" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Blogs</Link>
                <Link href="/writers" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Writers</Link>
                <Link href="/#about" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">About</Link>
                <Link href="/contact" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Contact</Link>

                {!isAuthenticated ? (
                    <div className="flex justify-center w-full gap-x-2 px-4 mt-6">
                        <Link href="/login" className={`flex-1 text-center py-3  ${pathname.startsWith("/login") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Login</Link>
                        <Link href="/signup" className={`flex-1 text-center py-3  ${pathname.startsWith("/signup") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Signup</Link>
                    </div>
                ) : (
                    <div className="flex justify-center w-full gap-x-2 px-4 mt-6">
                        <Link href="/dashboard" className={`flex-1 text-center py-3 px-1 ${pathname.startsWith("/dashboard") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Dashboard</Link>
                        <button onClick={handleSignOutAction} className={`flex-1 text-center py-3 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Sign Out</button>
                    </div>
                )}
                {/* <div className="relative w-full px-4 mt-6">
"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [triggerRevalidation, setTriggerRevalidation] = useState(1)
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (pathname.startsWith('/dashboard')) {
            setTriggerRevalidation(triggerRevalidation + 1)
        }

        // Loading Bar
        setProgress(30)

        setTimeout(() => {
            setProgress(70)
        }, 100);

        setTimeout(() => {
            setProgress(100)
        }, 800);

        setTimeout(() => {
            setProgress(0)
        }, 900);
    }, [pathname])

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => { setIsLoading(false) }, [])

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const res = await fetch('/api/auth/sessionJWTtoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // <-- THIS IS CRUCIAL
                    },
                    body: '',
                });

                res.json().then(data => {
                    setIsAuthenticated(data.isAuthenticated);
                    console.log(data, isAuthenticated)
                })
            } catch (error) {
                console.error('Failed to fetch auth status:', error);
                setIsAuthenticated(false); // Assume not authenticated on error
            }
        }
        checkAuthStatus()
        console.log("Checking AuthStatus")
    }, [triggerRevalidation])

    // State for themes
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('isDarkMode') === "true") {
            setIsDarkMode(true)
        } else if (localStorage.getItem('isDarkMode') === "false") {
            setIsDarkMode(false)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    // Effect to apply the theme class to the body element
    useEffect(() => { if (!isLoading) document.body.classList.toggle('dark-theme') }, [isDarkMode]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            toggleMobileMenu()
        }
    }, [pathname])

    // State to manage the visibility of the mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Function to toggle the mobile menu's visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleSignOutAction = () => {
        fetch("/api/auth/resettoken", { method: 'POST' })
            .then(() => {
                if (isMobileMenuOpen) toggleMobileMenu()

                router.push('/')
                setTriggerRevalidation(triggerRevalidation + 1)
            })
            .catch(() => alert("Couldn't Sign Out!!"))
    }

    return (
        <>
            {/* Navbar component */}
            <nav className={`bg-navbar-bg bg-opacity-50 backdrop-filter backdrop-blur-lg p-4  shadow-lg rounded-b-lg ${!(pathname.startsWith('/blogpost') || pathname.startsWith('/dashboard') || pathname.startsWith('/contact')) && 'sticky'} top-0 z-20`}>
                <LoadingBar
                    color="#2563EB"
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
                <div className="container mx-auto flex justify-between items-center">
                    {/* Brand/Logo (on the left) */}
                    <div className="text-2xl font-bold">
                        SamBlogs
                    </div>

                    {/* Desktop Navigation Links, Search Bar, and Theme Switch */}
                    <div className="hidden md:flex items-center">
                        <Link href="/#home" className="ml-auto hover:text-blue-400 transition duration-300">Home</Link>
                        <Link href="/exploreblogs" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Blogs</Link>
                        <Link href="/writers" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Writers</Link>
                        <Link href="/#about" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">About</Link>
                        <Link href="/contact" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Contact</Link>
                        {/* Login and Signup as unique buttons with less gap */}
                        {!isAuthenticated ? (
                            <div className="flex items-center gap-x-2 ml-4">
                                <Link href="/login" className={`px-4 py-2 ${pathname.startsWith("/login") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Login</Link>
                                <Link href={'/signup'} className={`px-4 py-2 ${pathname.startsWith("/signup") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Signup</Link>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-x-2 ml-4">
                                    <Link href="/dashboard" className={`px-4 py-2 ${pathname.startsWith("/dashboard") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Dashboard</Link>
                                </div>
                                <div className="flex items-center gap-x-2 ml-2">
                                    <button onClick={handleSignOutAction} className={`px-4 py-2 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Sign Out</button>
                                </div>
                            </>
                        )}

                        {/* <div className="relative ml-3">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-2 pl-10 rounded-md bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div> */}
                        {/* Theme Switch SVG Icon - now toggles based on isDarkMode state */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300 ml-3">
                            {isDarkMode ? (
                                // Sun icon for light mode when currently in dark mode
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
                                </svg>
                            ) : (
                                // Moon icon for dark mode when currently in light mode
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hamburger) and Theme Switch for mobile */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Theme Switch SVG Icon for Mobile - now toggles based on isDarkMode state */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300">
                            {isDarkMode ? (
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                        <button
                            id="mobile-menu-button"
                            className=" focus:outline-none p-2 rounded-md hover:bg-gray-700 transition duration-300"
                            onClick={toggleMobileMenu} // Attach click handler for menu toggle
                        >
                            {/* Hamburger Icon (Inline SVG) */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Div (Side Screen) - Slides from right */}
            <div
                id="mobile-menu"
                className={`fixed top-0 right-0 w-[65vw] h-full bg-navbar-bg bg-opacity-90 bg-surface z-50
                            transform transition-transform duration-300 ease-in-out
                            md:hidden flex flex-col items-center pt-[100px] space-y-6 overflow-y-auto
                            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Close button for the sliding menu (cross SVG) */}
                <button onClick={toggleMobileMenu} className="absolute top-4 left-4  p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Mobile Navigation Links - Adjusted for column layout and impressive styling */}
                <Link href="/#home" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Home</Link>
                <Link href="/exploreblogs" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Blogs</Link>
                <Link href="/writers" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Writers</Link>
                <Link href="/#about" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">About</Link>
                <Link href="/contact" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Contact</Link>

                {!isAuthenticated ? (
                    <div className="flex justify-center w-full gap-x-2 px-4 mt-6">
                        <Link href="/login" className={`flex-1 text-center py-3  ${pathname.startsWith("/login") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Login</Link>
                        <Link href="/signup" className={`flex-1 text-center py-3  ${pathname.startsWith("/signup") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Signup</Link>
                    </div>
                ) : (
                    <div className="flex justify-center w-full gap-x-2 px-4 mt-6">
                        <Link href="/dashboard" className={`flex-1 text-center py-3 px-1 ${pathname.startsWith("/dashboard") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Dashboard</Link>
                        <button onClick={handleSignOutAction} className={`flex-1 text-center py-3 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Sign Out</button>
                    </div>
                )}
                {/* <div className="relative w-full px-4 mt-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-3 pl-12 rounded-md bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-white text-lg"
                    />
                    <svg className="absolute left-7 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div> */}
            </div>
        </>
    );
};

export default Navbar;"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import LoadingBar from "react-top-loading-bar";

const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const [triggerRevalidation, setTriggerRevalidation] = useState(1)
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (pathname.startsWith('/dashboard')) {
            setTriggerRevalidation(triggerRevalidation + 1)
        }

        // Loading Bar
        setProgress(30)

        setTimeout(() => {
            setProgress(70)
        }, 100);

        setTimeout(() => {
            setProgress(100)
        }, 800);

        setTimeout(() => {
            setProgress(0)
        }, 900);
    }, [pathname])

    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => { setIsLoading(false) }, [])

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        async function checkAuthStatus() {
            try {
                const res = await fetch('/api/auth/sessionJWTtoken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json', // <-- THIS IS CRUCIAL
                    },
                    body: '',
                });

                res.json().then(data => {
                    setIsAuthenticated(data.isAuthenticated);
                    console.log(data, isAuthenticated)
                })
            } catch (error) {
                console.error('Failed to fetch auth status:', error);
                setIsAuthenticated(false); // Assume not authenticated on error
            }
        }
        checkAuthStatus()
        console.log("Checking AuthStatus")
    }, [triggerRevalidation])

    // State for themes
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('isDarkMode') === "true") {
            setIsDarkMode(true)
        } else if (localStorage.getItem('isDarkMode') === "false") {
            setIsDarkMode(false)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode))
    }, [isDarkMode])

    // Effect to apply the theme class to the body element
    useEffect(() => { if (!isLoading) document.body.classList.toggle('dark-theme') }, [isDarkMode]);

    useEffect(() => {
        if (isMobileMenuOpen) {
            toggleMobileMenu()
        }
    }, [pathname])

    // State to manage the visibility of the mobile menu
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Function to toggle the mobile menu's visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Function to toggle theme
    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    const handleSignOutAction = () => {
        fetch("/api/auth/resettoken", { method: 'POST' })
            .then(() => {
                if (isMobileMenuOpen) toggleMobileMenu()

                router.push('/')
                setTriggerRevalidation(triggerRevalidation + 1)
            })
            .catch(() => alert("Couldn't Sign Out!!"))
    }

    return (
        <>
            {/* Navbar component */}
            <nav className={`bg-navbar-bg bg-opacity-50 backdrop-filter backdrop-blur-lg p-4  shadow-lg rounded-b-lg ${!(pathname.startsWith('/blogpost') || pathname.startsWith('/dashboard') || pathname.startsWith('/contact')) && 'sticky'} top-0 z-20`}>
                <LoadingBar
                    color="#2563EB"
                    progress={progress}
                    onLoaderFinished={() => setProgress(0)}
                />
                <div className="container mx-auto flex justify-between items-center">
                    {/* Brand/Logo (on the left) */}
                    <div className="text-2xl font-bold">
                        SamBlogs
                    </div>

                    {/* Desktop Navigation Links, Search Bar, and Theme Switch */}
                    <div className="hidden md:flex items-center">
                        <Link href="/#home" className="ml-auto hover:text-blue-400 transition duration-300">Home</Link>
                        <Link href="/exploreblogs" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Blogs</Link>
                        <Link href="/writers" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Writers</Link>
                        <Link href="/#about" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">About</Link>
                        <Link href="/contact" className="ml-2 lg:ml-4 hover:text-blue-400 transition duration-300">Contact</Link>
                        {/* Login and Signup as unique buttons with less gap */}
                        {!isAuthenticated ? (
                            <div className="flex items-center gap-x-2 ml-4">
                                <Link href="/login" className={`px-4 py-2 ${pathname.startsWith("/login") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Login</Link>
                                <Link href={'/signup'} className={`px-4 py-2 ${pathname.startsWith("/signup") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Signup</Link>
                            </div>
                        ) : (
                            <>
                                <div className="flex items-center gap-x-2 ml-4">
                                    <Link href="/dashboard" className={`px-4 py-2 ${pathname.startsWith("/dashboard") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Dashboard</Link>
                                </div>
                                <div className="flex items-center gap-x-2 ml-2">
                                    <button onClick={handleSignOutAction} className={`px-4 py-2 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md`}>Sign Out</button>
                                </div>
                            </>
                        )}

                        {/* <div className="relative ml-3">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="p-2 pl-10 rounded-md bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div> */}
                        {/* Theme Switch SVG Icon - now toggles based on isDarkMode state */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300 ml-3">
                            {isDarkMode ? (
                                // Sun icon for light mode when currently in dark mode
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
                                </svg>
                            ) : (
                                // Moon icon for dark mode when currently in light mode
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button (Hamburger) and Theme Switch for mobile */}
                    <div className="md:hidden flex items-center space-x-2">
                        {/* Theme Switch SVG Icon for Mobile - now toggles based on isDarkMode state */}
                        <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300">
                            {isDarkMode ? (
                                <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h1M3 12h1m15.325-7.757l-.707.707M5.382 18.325l-.707.707M18.325 5.382l.707-.707M5.382 5.382l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z"></path>
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                                </svg>
                            )}
                        </button>
                        <button
                            id="mobile-menu-button"
                            className=" focus:outline-none p-2 rounded-md hover:bg-gray-700 transition duration-300"
                            onClick={toggleMobileMenu} // Attach click handler for menu toggle
                        >
                            {/* Hamburger Icon (Inline SVG) */}
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Div (Side Screen) - Slides from right */}
            <div
                id="mobile-menu"
                className={`fixed top-0 right-0 w-[65vw] h-full bg-navbar-bg bg-opacity-90 bg-surface z-50
                            transform transition-transform duration-300 ease-in-out
                            md:hidden flex flex-col items-center pt-[100px] space-y-6 overflow-y-auto
                            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Close button for the sliding menu (cross SVG) */}
                <button onClick={toggleMobileMenu} className="absolute top-4 left-4  p-2 rounded-full hover:bg-gray-700 focus:outline-none transition duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Mobile Navigation Links - Adjusted for column layout and impressive styling */}
                <Link href="/#home" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Home</Link>
                <Link href="/exploreblogs" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Blogs</Link>
                <Link href="/writers" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Writers</Link>
                <Link href="/#about" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">About</Link>
                <Link href="/contact" className="w-full text-center py-3 text-2xl font-semibold hover:bg-gray-700 rounded-md transition duration-300">Contact</Link>

                {!isAuthenticated ? (
                    <div className="flex justify-center w-full gap-x-2 px-4 mt-6">
                        <Link href="/login" className={`flex-1 text-center py-3  ${pathname.startsWith("/login") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Login</Link>
                        <Link href="/signup" className={`flex-1 text-center py-3  ${pathname.startsWith("/signup") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Signup</Link>
                    </div>
                ) : (
                    <div className="flex justify-center w-full gap-x-2 px-4 mt-6">
                        <Link href="/dashboard" className={`flex-1 text-center py-3 px-1 ${pathname.startsWith("/dashboard") ? "bg-blue-800 font-semibold" : "bg-blue-700"} rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Dashboard</Link>
                        <button onClick={handleSignOutAction} className={`flex-1 text-center py-3 bg-blue-700 rounded-md hover:bg-blue-800 transition duration-300 text-white shadow-md text-xl`}>Sign Out</button>
                    </div>
                )}
                {/* <div className="relative w-full px-4 mt-6">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full p-3 pl-12 rounded-md bg-gray-700  placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-white text-lg"
                    />
                    <svg className="absolute left-7 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                </div> */}
            </div>
        </>
    );
};

export default Navbar;
