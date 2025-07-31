"use client"; // This component needs client-side interactivity
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation'; // Corrected import for useRouter in App Router
import Link from 'next/link';

import { useForm, Controller } from 'react-hook-form';

// --- Login Page Component ---
// This component relies on a parent component (e.g., your layout) to apply the 'dark-theme' class
// to the document's root element (<html>) for theme switching.
const LoginPage = () => {
    const router = useRouter(); // Initialize useRouter
    const pathname = usePathname()

    // Initialize react-hook-form with the field names that match your backend schema
    const { handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            name: '',     // Changed from 'username' to 'name' to match your Mongoose schema
            email: '',
            password: '',
        },
    });

    // State for managing loading status during form submission
    const [isLoading, setIsLoading] = useState(false);
    // State for displaying a general error message (e.g., from API)
    const [errorMessage, setErrorMessage] = useState('');
    // State for displaying a success message
    const [successMessage, setSuccessMessage] = useState('');
    // State for toggling password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle form submission
    // The 'data' parameter here is automatically populated by react-hook-form
    // with the values from your controlled inputs.
    console.log(pathname.endsWith('/signup')? '/api/auth/signup': "/api/auth/login")
    const onSubmit = async (data) => {
        setIsLoading(true); // Start loading
        setErrorMessage(''); // Clear previous errors
        setSuccessMessage(''); // Clear previous success messages

        try {
            const response = await fetch(pathname.endsWith('/signup')? '/api/auth/signup': "/api/auth/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // <-- THIS IS CRUCIAL
                },
                body: JSON.stringify(data), // <-- Use 'data' from react-hook-form directly
            });
            console.log("response is: ", response)
            const responseData = await response.json();

            if (response.status===201) {
                console.log('Signup successful:', response);
                pathname.endsWith('/signup') ? setSuccessMessage('Account created successfully! Redirecting...') : setSuccessMessage('Loggedin successfully! Redirecting...')
                router.push('/dashboard');
            } else {
                setErrorMessage(responseData.error);
            }

        } catch (error) {
            console.error('Network error:', error);
            setErrorMessage('Network error. Please check your internet connection.');
        } finally {
            setIsLoading(false); // Stop loading regardless of success or failure
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300">
            <div className="login-form-bg p-10 rounded-xl shadow-2xl w-full max-w-lg border border-[var(--light-text-color-tertiary)] dark:border-[var(--dark-text-color-tertiary)] transform transition-all duration-300 hover:shadow-3xl">
                <h2 className="text-3xl font-bold mb-8 text-center text-[var(--light-text-color-primary)] dark:text-[var(--dark-text-color-primary)]">
                    {pathname.endsWith('/signup') ? "Create Acount" : "Log In to SamBlogs"}
                </h2>

                {/* Display general error message */}
                {errorMessage && (
                    <div className="text-red-600 text-center mb-4">{errorMessage}</div>
                )}
                {/* Display success message */}
                {successMessage && (
                    <div className="text-green-600 text-center mb-4">{successMessage}</div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Input */}
                    {pathname.endsWith('/signup') ? (
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-[var(--light-text-color-secondary)] dark:text-[var(--dark-text-color-secondary)] mb-1">
                                Name
                            </label>
                            <Controller
                                name="name" // Changed to 'name' to match defaultValues and schema
                                control={control}
                                rules={{
                                    required: 'Name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Name must be at least 3 characters',
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        {...field} // This correctly binds value, onChange, name etc. from react-hook-form
                                        type="text"
                                        id="name"
                                        className="mt-1 block w-full pr-10 px-4 py-2 border border-[var(--light-text-color-tertiary)] outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-700 bg-white text-[var(--light-text-color-primary)] placeholder-[var(--light-text-color-tertiary)]"
                                        placeholder="your name"
                                    />
                                )}
                            />
                            {errors.name && ( // Error for 'name' field
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name.message}</p>
                            )}
                        </div>
                    ) : ''}


                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[var(--light-text-color-secondary)] dark:text-[var(--dark-text-color-secondary)] mb-1">
                            Email Address
                        </label>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: 'Email is required',
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                                    message: 'Email must end with @gmail.com',
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="email"
                                    id="email"
                                    className="mt-1 block w-full pr-10 px-4 py-2 border border-[var(--light-text-color-tertiary)] outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-700 bg-white text-[var(--light-text-color-primary)] placeholder-[var(--light-text-color-tertiary)]"
                                    placeholder="your.email@gmail.com"
                                />
                            )}
                        />
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password Input with Eye Button */}
                    <div className="relative">
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--light-text-color-secondary)] mb-1">
                            Password
                        </label>
                        <Controller
                            name="password"
                            control={control}
                            rules={{
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters',
                                },
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    className="mt-1 block w-full pr-10 px-4 py-2 border border-[var(--light-text-color-tertiary)] outline-none rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-700 bg-white text-[var(--light-text-color-primary)] placeholder-[var(--light-text-color-tertiary)]"
                                    placeholder="xyz!@@323mkdir"
                                />
                            )}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-6 text-[var(--light-text-color-secondary)]"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {/* Eye icon - SVG for better scalability and customization */}
                            {showPassword ? (
                                // Open eye icon
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            ) : (
                                // Closed eye (eye-slash) icon
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M10.0302 9.73727C9.39893 10.2873 9 11.097 9 12C9 13.6569 10.3431 15 12 15C12.903 15 13.7127 14.6011 14.2627 13.9699L13.5531 13.2602C13.1864 13.7116 12.6269 14 12 14C10.8954 14 10 13.1046 10 12C10 11.3731 10.2884 10.8136 10.7398 10.4469L10.0302 9.73727Z" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.25807 6.96518C5.22008 8.23056 3.59792 10.1049 2.58237 11.7248C2.61616 11.6735 2.66003 11.6276 2.71343 11.5903C2.93972 11.432 3.25146 11.4871 3.40973 11.7134C3.47423 11.8057 3.53871 11.8966 3.60314 11.9862C4.61478 10.4521 6.1419 8.78263 7.98636 7.69347L7.25807 6.96518ZM8.91589 7.20879C9.37327 7.00159 9.84644 6.83302 10.3328 6.71244C11.8242 6.34267 13.4525 6.41944 15.1657 7.23083C16.8279 8.01806 18.597 9.51008 20.3968 12.0138C20.4585 11.9202 20.5183 11.8272 20.5761 11.7348C20.7226 11.5007 21.0311 11.4297 21.2652 11.5761C21.3205 11.6107 21.3667 11.6544 21.4031 11.7039C19.4717 8.94498 17.5146 7.23681 15.5937 6.32707C13.6621 5.41225 11.7966 5.31923 10.0922 5.74182C9.42143 5.90812 8.77768 6.15354 8.16533 6.45823L8.91589 7.20879ZM2.59026 12.2866L2.59692 12.2961C2.57989 12.2729 2.56501 12.2484 2.55235 12.2229C2.56325 12.2447 2.57587 12.266 2.59026 12.2866ZM21.4476 11.7771C21.4801 11.8424 21.4979 11.9142 21.4999 11.987C21.4981 11.9155 21.481 11.8438 21.4476 11.7771ZM21.4589 12.1987C21.4877 12.132 21.5017 12.0596 21.4999 11.987C21.5018 12.0583 21.4885 12.1305 21.4589 12.1987ZM21.4589 12.1987C21.4475 12.2252 21.4337 12.2508 21.4176 12.2751L21.4238 12.2652C21.4374 12.2436 21.449 12.2214 21.4589 12.1987Z" />
                                    <path d="M4 4L20 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M16.3757 16.0828C15.5377 16.6237 14.6282 17.0493 13.6672 17.2876C12.1758 17.6573 10.5475 17.5806 8.83432 16.7692C7.11263 15.9538 5.27624 14.3822 3.40973 11.7134C3.25147 11.4872 2.93972 11.432 2.71343 11.5903C2.48714 11.7485 2.432 12.0603 2.59026 12.2866C4.52375 15.0511 6.4832 16.7621 8.40629 17.6729C10.3379 18.5878 12.2034 18.6808 13.9078 18.2582C15.0579 17.973 16.1286 17.4553 17.0978 16.805L16.3757 16.0828ZM17.9151 16.208C19.4093 15.0257 20.6117 13.5632 21.4238 12.2652C21.5703 12.0312 21.4993 11.7226 21.2652 11.5762C21.0311 11.4297 20.7226 11.5007 20.5761 11.7348C19.7826 13.0029 18.6194 14.3964 17.2027 15.4956L17.9151 16.208Z" />
                                </svg>
                            )}
                        </button>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Submit Button with Loading Indicator */}
                    <button
                        type="submit"
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-lg text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? (
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            pathname.endsWith('/signup') ? "Create Acount" : "Sign In"
                        )}
                    </button>
                </form>

                {/* Signup Link */}
                {pathname.endsWith('/signup') ?(
                    <p className="mt-6 text-center text-sm text-[var(--light-text-color-secondary)] dark:text-[var(--dark-text-color-secondary)]">
                    Already have an account? 
                    <Link href="/login" className="font-medium mx-2 text-blue-600 hover:text-blue-500 cursor-pointer">
                        Login
                    </Link>
                </p>
                ): (
                    <p className="mt-6 text-center text-sm text-[var(--light-text-color-secondary)] dark:text-[var(--dark-text-color-secondary)]">
                    Don't have an account? 
                    <Link href="/login" className="font-medium mx-2 text-blue-600 hover:text-blue-500 cursor-pointer">
                        Signup
                    </Link>
                </p>
                )}
                
            </div>
        </div>
    );
};

export default LoginPage;
