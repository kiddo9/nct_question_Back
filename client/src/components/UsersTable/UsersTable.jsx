import React, { useEffect, useState } from 'react'
import UserRow from './UserRow';
import Loader from '../Loader'
import { User } from 'lucide-react';


const UsersTable = ( { sortedUsers, selectedRows, toggleSelectRow, toggleSelectAll, requestSort, sortConfig, currentPage, numberPerPage, loader, roleLoader}) => {
  const [load, setLoad] = useState(false);
useEffect(() => {
  setLoad(true);
  const timeoutId = setTimeout(() => {
    console.log("Timeout executed");
    // Add any other logic you want to execute after the timeout here
    setLoad(false);
  }, 1000); // 5000 milliseconds = 5 seconds

  return () => clearTimeout(timeoutId); // Cleanup the timeout on component unmount
}, []);

  return (
    <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="p-4 w-8">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    checked={selectedRows.length === sortedUsers.length && sortedUsers.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('id')}
                >
                  <div className="flex items-center space-x-1">
                    <span>ID</span>
                    {sortConfig.key === 'id' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('name')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Name</span>
                    {sortConfig.key === 'name' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('role')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Role</span>
                    {sortConfig.key === 'role' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('email')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Email</span>
                    {sortConfig.key === 'email' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('loggedIn')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Logged In</span>
                    {sortConfig.key === 'loggedIn' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('passwordSet')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Password Set</span>
                    {sortConfig.key === 'passwordSet' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('status')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    {sortConfig.key === 'status' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => requestSort('createdAt')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Created At</span>
                    {sortConfig.key === 'createdAt' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 w-full">
              {load || loader || roleLoader ? <Loader/>
                : sortedUsers.slice((currentPage - 1) * numberPerPage, currentPage * numberPerPage).map((user, index) => (
                    <UserRow key={user.id} user={user} index={index} selectedRows={selectedRows} toggleSelectRow={toggleSelectRow} currentPage={currentPage} numberPerPage={numberPerPage} />
                ))}
                {!load && !loader && !roleLoader && sortedUsers.length <= 0 && (
                  <tr>
                    <td colSpan="10" className="px-4 py-8 text-center text-gray-500">
                      No questions found. Try adjusting your search or filters.
                    </td>
                  </tr>
              )}
            </tbody>
          </table>
  )
}

export default UsersTable