import React, { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const UserTableFilters = ({showFilters, setShowFilters, roles}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState({
    role: searchParams.get("role") || "",
    passwordSet: searchParams.get("passwordSet") || "",
    verifiedUser: searchParams.get("verifiedUser") || "",
    loggedIn: searchParams.get("loggedIn") || ""
  });

  // Function to update search params based on filters
  useEffect(() => {
    
    setSearchParams({
      page: 1, // reset page to 1
      role: filters.role,
      passwordSet: filters.passwordSet,
      verifiedUser: filters.verifiedUser,
      loggedIn: filters.loggedIn,
      
    });
  }, [filters]);
  

  // Options for filters
  // sections and questionGroups are arrays of objects with 'section_name' and 'title' properties respectively
  const filterOptions = {
    role: roles.map(role => ({
      value: role.roles,
      label: role.roles
    })),
    verifiedUser: [
        { value: 'true', label: 'Verified' },
        { value: 'false', label: 'Not Verified' }
    ],
    passwordSet: [
        { value: 'true', label: 'Password Set' },
        { value: 'false', label: 'Password Not Set' }
    ],
    loggedIn: [
        { value: 'true', label: 'Logged In' },
        { value: 'false', label: 'Not Logged In' }
    ]
  };

  const filterLabels = {
    role: 'Role',
    passwordSet: 'Password Set',
    verifiedUser: 'Verified User',
    loggedIn: 'Logged In',
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
        role: "",
        passwordSet: "",
        verifiedUser: "",
        loggedIn: ""
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(filters).reduce((total, filterArray) => total + filterArray.length, 0);
  };

  return (
    <div className="mb-4">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        {/* <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          <Filter className="w-4 h-4" />
          Filter
          {getActiveFilterCount() > 0 && (
            <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </button> */}
        
        {showFilters && (
          <button
            onClick={() => setShowFilters(false)}
            className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Collapse
          </button>
        )}
          
        
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="mt-3 p-4 bg-gray-50 border border-gray-200 rounded-md">
          <div className="grid grid-cols-2 lg:grid-cols-2 gap-4">
            {Object.entries(filterOptions).map(([filterType, options]) => (
              <div key={filterType}>
                <h4 className="text-sm font-medium text-gray-900 mb-2">
                  {filterLabels[filterType]}
                </h4>
                <div className=" flex flex-wrap gap-2 items-center">
                  {options.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center space-x-1 text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filters[filterType] ==option.value}
                        onChange={() => handleFilterChange(filterType, option.value)}
                        className="w-3 h-3 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Tags */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {Object.entries(filters).map(([filterType, selectedValue]) => {
            const option = filterOptions[filterType].find(opt => opt.value === selectedValue);
            if (!option) return null; // Skip if no option matches
            return (
              <span
                key={`${filterType}-${selectedValue}`}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
              >
                {option?.label}
                <button
                  onClick={() => handleFilterChange(filterType, "")}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserTableFilters;