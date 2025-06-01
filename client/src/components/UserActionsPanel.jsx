import React from 'react'
import { Link } from 'react-router-dom'

const UserActionsPanel = ({openUserActions, setOpenUserActions, setOpenNotification}) => {
   
  return (
    <div
        className={`fixed right-0 top-24 bg-white shadow-lg rounded-lg p-4 w-80 transition-all duration-300 ease-in-out ${
          openUserActions ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">User Actions</h2>
          <button

            onClick={() => setOpenUserActions(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            > 
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {/* User actions can be dynamically rendered here */}
        <ul className="mt-4 space-y-2 text-sm">
          <li className="flex items-center">
            
            <Link className="ml-2">View Profile</Link>
          </li>
          <li className="flex items-center">
            <Link onClick={() => setOpenNotification(true)} className="ml-2">Notifications</Link>
          </li>
          <li className="flex items-center">
            <Link className="ml-2">Change Password</Link>
          </li>
          <li className="flex items-center">
            <Link className="ml-2">Logout</Link>
          </li>
        </ul>
        
      </div>
  )
}

export default UserActionsPanel