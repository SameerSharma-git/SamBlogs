// components/profile/UserSettings.jsx
"use client";

import React, { useState } from 'react';

export default function UserSettings({ user, setSelectedView }) {
  const [saveMessage, setSaveMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSaveSettings = async () => {
    setSaveMessage('');
    setMessageType('');
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      console.log('Saving general settings (currently no specific settings to save)');
      setSaveMessage('Settings saved successfully!');
      setMessageType('success');
    } catch (error) {
      console.error('Error saving settings:', error);
      setSaveMessage('Failed to save settings. Please try again.');
      setMessageType('error');
    } finally {
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleChangeProfileClick = () => {
    setSelectedView('update-profile'); // Change the view to 'update-profile'
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 animate-fade-in-down">User Settings</h2>

      <div className="space-y-8 bg-surface p-8 rounded-lg shadow-xl border border-tertiary">
        {/* General Preferences Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4 pb-3 border-b border-gray-200 dark:border-gray-700">General Preferences</h3>
          <p className="text-secondary text-base leading-relaxed">
            This section is currently under development. Check back later for more personalization options!
          </p>
        </div>

        {/* Account Management Section */}
        <div>
          <h3 className="text-xl font-semibold text-primary mb-4 pt-4 pb-3 border-b border-gray-200 dark:border-gray-700">Account Management</h3>
          <p className="text-secondary text-base leading-relaxed mb-6">
            Manage your profile details, security settings, and account actions.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 mt-4"> {/* flex-wrap for better mobile layout */}
            <button
              className="flex-1 px-5 py-2.5 rounded-md text-sm font-semibold /* Adjusted padding and font size */
                         bg-gradient-to-br from-blue-600 to-blue-800 text-white
                         shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-95
                         hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
                         border border-blue-700 hover:border-blue-800"
              onClick={handleChangeProfileClick}
            >
              Change Profile
            </button>
            <button
              className="flex-1 px-5 py-2.5 rounded-md text-sm font-semibold /* Adjusted padding and font size */
                         bg-gradient-to-br from-gray-300 to-gray-400 text-gray-800
                         shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-95 bg-gray-400 hover:from-gray-400 hover:to-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75
                         border border-gray-400 hover:border-gray-500"
              onClick={() => alert('Change Password feature coming soon!')}
            >
              Change Password
            </button>
            <button
              className="flex-1 px-5 py-2.5 rounded-md text-sm font-semibold /* Adjusted padding and font size */
                         bg-gradient-to-br from-red-500 to-red-700 text-white
                         shadow-lg hover:shadow-xl transition-all duration-200 transform active:scale-95
                         hover:from-red-600 hover:to-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75
                         border border-red-600"
              onClick={() => alert('Deactivate Account feature coming soon!')}
            >
              Deactivate Account
            </button>
          </div>
        </div>

        {/* Save Settings Button */}
        {/* <button
          onClick={handleSaveSettings}
          className="
            w-full px-5 py-2.5 rounded-md text-base font-semibol
            bg-gradient-to-br from-blue-600 to-blue-800 text-white
            shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95
            hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 mt-6
            border border-blue-700 hover:border-blue-800
            dark:from-blue-700 dark:to-blue-900 dark:border-blue-800 dark:hover:from-blue-800 dark:hover:to-950>
          Save Settings"
        </button> */}

        {/* Message Display */}
        {saveMessage && (
          <p className={`text-center mt-4 p-3 rounded-md text-sm font-medium animate-fade-in
            ${messageType === 'success'
              ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-200'
              : 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {saveMessage}
          </p>
        )}
      </div>
    </div>
  );
}
