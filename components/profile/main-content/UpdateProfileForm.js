// components/profile/UpdateProfileForm.jsx
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form'; // Import useForm
import updateUser from '@/lib/actions/updateUser';
import { useRouter } from 'next/navigation';

export default function UpdateProfileForm({ user }) {
  const router = useRouter()
  const handleSoftReload = ()=>{ router.refresh() }

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // isSubmitting to replace isSaving
    watch, // To watch for changes in profilePicture
    setValue, // To manually set profilePicture value
    reset // To set initial form values
  } = useForm();

  const [saveMessage, setSaveMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [isImageUrlInputVisible, setIsImageUrlInputVisible] = useState(false);

  // Watch the profilePicture field from React Hook Form's state
  const currentProfilePicture = watch('profilePicture', user.profilePicture);

  // Use useEffect to set initial form values when the component mounts or user changes
  useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
    });
  }, [user, reset]); // Depend on user and reset function

  const onSubmit = async (data) => {
    setSaveMessage('');
    setMessageType('');

    try {
      await updateUser(user._id, {...data, updatedAt: Date.now()})
      handleSoftReload()
      setSaveMessage('Profile updated successfully!');
      setMessageType('success');
    } catch (error) {
      setSaveMessage('Failed to update profile. Please try again.');
      setMessageType('error');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  const handleProfilePictureChangeClick = () => {
    setIsImageUrlInputVisible(prev => !prev);
    // If the input is being hidden, clear the image URL in the form state
    if (isImageUrlInputVisible) {
      setValue('profilePicture', user.profilePicture || ''); // Revert to original or empty
    }
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 animate-fade-in-down">Update Your Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-6 pb-9 rounded-lg">
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-blue-500 shadow-lg">
            {/* Use currentProfilePicture from watch for dynamic preview */}
            <Image
              src={currentProfilePicture || '/path/to/default-avatar.png'} // Provide a fallback default image if currentProfilePicture is empty
              alt={`${user.name}'s profile picture`}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <button
            type="button"
            onClick={handleProfilePictureChangeClick}
            className="px-4 py-2 text-gray-800 rounded-full text-sm font-medium hover:bg-gray-300 transition-colors bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 shadow-sm hover:shadow-md"
          >
            {isImageUrlInputVisible ? 'Hide Image URL Input' : 'Change Picture'}
          </button>

          {/* New: Image URL Input Field */}
          {isImageUrlInputVisible && (
            <div className="mt-4 w-full"> {/* Added a div for layout */}
              <input
                type="text"
                placeholder="Enter new image URL"
                className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-white focus:border-blue-500 bg-gray-700 transition-all duration-200 shadow-sm focus:shadow-md"
                {...register("profilePicture")}
              />
              {errors.profilePicture && (
                <p className="text-red-600 text-sm mt-1">{errors.profilePicture.message}</p>
              )}
            </div>
          )}
        </div>

        {/* Full Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-secondary mb-1">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            // Use register to link with React Hook Form
            {...register("name", {
              required: "Name is required",
            })}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-white focus:border-blue-500 bg-gray-700 transition-all duration-200 shadow-sm focus:shadow-md"
          />
          {errors.name && (
            <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Email Address Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-secondary mb-1">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            // Use register to link with React Hook Form
            {...register("email", {
              required: "Email is required",
            })}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-white focus:border-blue-500 bg-gray-700 transition-all duration-200 shadow-sm focus:shadow-md"
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Bio Field */}
        <div>
          <label htmlFor="bio" className="block text-sm font-medium text-secondary mb-1">
            Bio
          </label>
          <textarea
            id="bio"
            rows="4"
            // Use register to link with React Hook Form
            {...register("bio", {
              required: "Bio is required",
            })}
            className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-500 text-white focus:border-blue-500 bg-gray-700 transition-all duration-200 shadow-sm focus:shadow-md"
          ></textarea>
          {errors.bio && (
            <p className="text-red-600 text-sm mt-1">{errors.bio.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`
            w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-lg
            hover:bg-blue-700 transition duration-300 transform hover:scale-[1.005] active:scale-95
            ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}
          `}
          disabled={isSubmitting} // Use isSubmitting from React Hook Form
        >
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>

        {saveMessage && (
          <p className={`text-center mt-4 text-sm font-medium animate-fade-in ${messageType === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {saveMessage}
          </p>
        )}
      </form>
    </div>
  );
}