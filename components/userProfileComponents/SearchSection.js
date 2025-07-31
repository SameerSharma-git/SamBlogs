import React from 'react'

const SearchSection = ({nameQuery, emailQuery, setEmailQuery, setNameQuery }) => {
    {/* Search Bar Section */ }
    return (
        <div className="bg-surface p-6 md:p-8 rounded-xl shadow-2xl mb-12 transform transition-transform duration-300 hover:scale-[1.005] border border-blue-200">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Search by Name */}
                <div className="flex-1">
                    <label htmlFor="name-search" className="block text-lg font-semibold text-gray-700 mb-2">
                        Search by Name
                    </label>
                    <input
                        type="text"
                        id="name-search"
                        placeholder="e.g., Alice Wonderland"
                        className={`w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm
                           bg-gray-50 text-gray-900 placeholder-gray-400`}
                        value={nameQuery}
                        onChange={(e) => setNameQuery(e.target.value)}
                    />
                </div>

                {/* Search by Email */}
                <div className="flex-1">
                    <label htmlFor="email-search" className="block text-lg font-semibold text-gray-700 mb-2">
                        Search by Email
                    </label>
                    <input
                        type="email"
                        id="email-search"
                        placeholder="e.g., alice.w@example.com"
                        className={`w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm
                           bg-gray-50 text-gray-900 placeholder-gray-400`}
                        value={emailQuery}
                        onChange={(e) => setEmailQuery(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

export default SearchSection
