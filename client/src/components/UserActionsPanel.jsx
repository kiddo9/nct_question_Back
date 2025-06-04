import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from './security/Authentication'
import { BellIcon, KeyRoundIcon, LogOut } from 'lucide-react'

const UserActionsPanel = ({openUserActions, setOpenUserActions, setOpenNotification, logoutAdmin}) => {
  
  const { user } = useAuth()

  {/* Close the user actions panel when clicking outside of it */}
  const handleClickOutside = (event) => {
    if (openUserActions && !event.target.classList.contains("user-actions-panel") && !event.target.parentElement?.classList.contains("user-actions-panel")) {
      setOpenUserActions(false)
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openUserActions]);
  return (
    <div
        className={`fixed right-0 top-24 bg-white shadow-lg rounded-lg py-4 w-80 transition-all duration-300 ease-in-out user-actions-panel ${
          openUserActions ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4">
          <header className='user-actions-panel'>
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-xs text-blue-600 font-medium">{user.role &&  user.role.roles && user.role.roles.charAt(0).toUpperCase() + user.role.roles.slice(1)}</p>
          </header>
          <button

            onClick={() => setOpenUserActions(false)}
            className="text-gray-500 hover:text-gray-700 cursor-pointer absolute top-2 right-2 rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
            aria-label="Close User Actions Panel"
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
        <hr className='text-gray-200 my-2'/>
        {/* User actions can be dynamically rendered here */}
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li className="flex my-4 gap-2 items-center hover:text-[#6699ff] ml-4 w-fit cursor-pointer">
            <BellIcon className="w-4 h-4 " />
            <Link onClick={() => setOpenNotification(true)}>Notifications</Link>
          </li>
          <li className="flex gap-2 my-4 items-center hover:text-[#6699ff] ml-4 w-fit cursor-pointer">
            <KeyRoundIcon className="w-4 h-4" />
            <Link>Change Password</Link>
          </li>
          <hr className='text-gray-200 my-4'/>
          <li onClick={logoutAdmin} className="flex gap-2 my-2 items-center hover:text-red-500 ml-4 w-fit cursor-pointer">
            <LogOut className="w-4 h-4" />
            <Link>Logout</Link>
          </li>
        </ul>
        
      </div>
  )
}

export default UserActionsPanel