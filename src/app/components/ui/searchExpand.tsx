"use client";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";

const SearchExtend = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");

  const handleSearchClick = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
        setTimeout(() => {
            const searchInput = document.getElementById("searchInput");
            if (searchInput) {
                searchInput.focus();
            }
        }, 100);
    }
};


  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setError("Please enter a search term");
      return;
    }
    setError("");
    console.log("Searching for:", searchQuery);
    // Add your search logic here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setError("");
  };

  return (
    <div className="flex justify-end p-4 relative">
  <div
    className={`relative flex items-center transition-all duration-300 ease-in-out ${
      isExpanded ? "w-full md:w-96" : "w-10"
    }`}
  >
    <form
      onSubmit={handleSearch}
      className={`absolute right-0 flex items-center transition-all duration-300 ease-in-out ${
        isExpanded ? "w-full md:w-96" : "w-10"
      }`}
    >
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search here..."
        aria-label="Search input field"
        className={`w-full py-2 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:border-transparent shadow-sm transition-all duration-300 ${
          isExpanded ? "opacity-100" : "opacity-0 w-0 p-0"
        } ${error ? "border-red-500 focus:ring-red-400" : ""}`}
      />
      <button
        type="button"
        onClick={handleSearchClick}
        aria-label="Toggle search bar"
        className={`absolute right-2 p-2 rounded-full hover:bg-gray-100 focus:outline-none transition-all duration-300 ease-in-out`}
      >
        <FiSearch
          className="w-6 h-6 text-lightBg hover:text-black"
          aria-hidden="true"
        />
      </button>
    </form>
  </div>
  {error && (
    <div className="mt-2 text-sm text-red-500" role="alert">
      {error}
    </div>
  )}
</div>

  );
};

export default SearchExtend;
