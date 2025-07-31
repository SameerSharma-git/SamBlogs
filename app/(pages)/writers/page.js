"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Keeping Next.js Image component as requested
import { findAllUsers } from '@/lib/actions/findUser';
import Link from 'next/link';
import HeadingSection from '@/components/userProfileComponents/HeadingSection';
import SearchSection from '@/components/userProfileComponents/SearchSection';

export default function WritersPage() {
  // State to hold the search queries
  const [nameQuery, setNameQuery] = useState('');
  const [emailQuery, setEmailQuery] = useState('');
  // State to hold the writers filtered by search queries
  const [filteredWriters, setFilteredWriters] = useState(null);
  const [allWriters, setAllWriters] = useState(null)

  useEffect(() => {
    findAllUsers().then(foundUsers => {
      setFilteredWriters(foundUsers)
      setAllWriters(foundUsers)
    })
  }, [])

  // Effect to filter writers whenever search queries change
  useEffect(() => {
    const lowerCaseNameQuery = nameQuery.toLowerCase();
    const lowerCaseEmailQuery = emailQuery.toLowerCase();

    const results = allWriters?.filter(writer => {
      // Check if writer's name includes the name query (case-insensitive)
      const matchesName = writer.name.toLowerCase().includes(lowerCaseNameQuery);
      // Check if writer's email includes the email query (case-insensitive)
      const matchesEmail = writer.email.toLowerCase().includes(lowerCaseEmailQuery);

      // A writer is included if both name and email queries match (if provided)
      return matchesName && matchesEmail;
    });

    setFilteredWriters(results);
  }, [nameQuery, emailQuery]); // Re-run effect when nameQuery or emailQuery changes

  

  if (!filteredWriters) {
    return (
      <>
        <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 transition-colors duration-500">
          <HeadingSection/>
          <SearchSection nameQuery={nameQuery} emailQuery={emailQuery} setNameQuery={setNameQuery} setEmailQuery={setEmailQuery} />

          <div className='text-5xl md:text-7xl font-semibold pt-20 text-blue-600 text-center h-[50dvh] animate-pulse'>Loading.........</div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <HeadingSection/>
        <SearchSection nameQuery={nameQuery} emailQuery={emailQuery} setNameQuery={setNameQuery} setEmailQuery={setEmailQuery} />

        {/* Writers Grid */}
        {filteredWriters?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredWriters.map((writer, index) => (
              <div
                key={writer._id}
                className={`bg-surface rounded-xl shadow-lg p-6 flex flex-col items-center text-center
                           transform transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-100
                           animate-card-fade-in`}
                style={{ animationDelay: `${index * 0.05}s` }} // Staggered animation
              >
                {/* Profile Picture */}
                <div className="relative w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-blue-400 shadow-md">
                  <Image
                    src={writer.profilePicture}
                    alt={writer.name}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Writer Name */}
                <h3 className="text-2xl font-bold text-blue-700 mb-2">
                  {writer.name}
                </h3>

                {/* Writer Email */}
                <p className="text-md text-gray-600 mb-3 break-words">
                  {writer.email}
                </p>

                {/* Writer Bio */}
                <p className="text-sm text-gray-500 italic flex-grow">
                  "{writer.bio}"
                </p>

                <Link
                  href={`/user-profile/${writer._id.toString()}`}
                  className="mt-5 px-6 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-md
                             hover:bg-blue-700 transition duration-300 transform hover:scale-105
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  View Profile
                </Link>
              </div>
            ))}
          </div>
        ) : (
          // No results message
          <div className="text-center py-20 bg-surface rounded-xl shadow-lg border border-blue-200 animate-fade-in">
            <p className="text-2xl font-semibold text-gray-700 mb-4">
              No writers found matching your criteria.
            </p>
            <p className="text-lg text-gray-500">
              Try adjusting your search terms or browse all writers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}