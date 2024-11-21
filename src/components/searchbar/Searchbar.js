import React, { useState } from 'react';

function Searchbar({ dropdownData, searchData }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For category dropdown visibility

  const performSearch = (category, operation, searchTerm) => {
    if (!category || !operation || !searchTerm) {
      setSearchResults([]);  // Reset results if any required field is missing
      return;
    }

    let results = [];

    if (operation === "like") {
      results = searchData.filter(item =>
        item[category]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (operation === "equalto") {
      results = searchData.filter(item =>
        item[category]?.toString().toLowerCase() === searchTerm.toLowerCase()
      );
    } else if (operation === "exact" && category === "Quantity") {
      results = searchData.filter(item => item[category] === parseInt(searchTerm));
    } else if (operation === "greater" && category === "Quantity") {
      results = searchData.filter(item => item[category] > parseInt(searchTerm));
    } else if (operation === "smaller" && category === "Quantity") {
      results = searchData.filter(item => item[category] < parseInt(searchTerm));
    }

    setSearchResults(results);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedOperation(''); // Reset operation when category changes
  };

  const handleOperationChange = (e) => {
    setSelectedOperation(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    performSearch(selectedCategory, selectedOperation, searchValue);
  };

  const selectedCategoryData = dropdownData.find(item => item.name === selectedCategory);

  // Toggle dropdown visibility for category
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="max-w-4xl mx-auto p-4">
      <div className="flex items-center space-x-4"> {/* Flex to align elements side by side */}
        {/* Category Dropdown */}
        <div className="flex-shrink-0 z-10">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
          >
            {selectedCategory || "Select Category"}
            <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
          </button>

          {/* Dropdown Menu for Category */}
          {isDropdownOpen && (
            <div id="dropdown" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute mt-2">
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {dropdownData.map((item, index) => (
                  <li key={index}>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategoryChange({ target: { value: item.name } })}
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Operation Dropdown (appears after selecting category) */}
        {selectedCategory && selectedCategoryData && (
          <div className="flex-shrink-0 z-10">
            <select
              id="operation"
              value={selectedOperation}
              onChange={handleOperationChange}
              className="p-2 w-full text-sm font-medium text-gray-900 bg-gray-100 border border-gray-300 rounded-r-lg focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-gray-700"
            >
              <option value="">Select Operation</option>
              {selectedCategoryData.searchOptions.map((operation, index) => (
                <option key={index} value={operation}>
                  {operation}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Input */}
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            value={searchValue}
            onChange={handleSearchChange}
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-lg border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            disabled={!selectedCategory || !selectedOperation || !searchValue}
          >
            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>

      {/* Display Search Results */}
      <div className="mt-6">
        <h1 className="text-xl font-semibold mb-4">Search Results:</h1>
        {searchResults.length > 0 ? (
          <ul className="space-y-2">
            {searchResults.map((item, index) => (
              <li key={index} className="p-4 bg-gray-100 rounded-md shadow-sm">
                <p><strong>Name:</strong> {item.Name}</p>
                <p><strong>Last Name:</strong> {item.LastName}</p>
                <p><strong>Quantity:</strong> {item.Quantity}</p>
                <p><strong>Item Name:</strong> {item.ItemName}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </form>
  );
}

export default Searchbar;
