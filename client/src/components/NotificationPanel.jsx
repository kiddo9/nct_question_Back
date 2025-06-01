import React from 'react'

const NotificationPanel = ({openNotification, setOpenNotification}) => {
  return (
    <div
        className={`fixed right-0 top-24 bg-white shadow-lg rounded-lg p-4 w-80 transition-all duration-300 ease-in-out ${
          openNotification ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Notifications</h2>
          <button

            onClick={() => setOpenNotification(false)}
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
        {/* Notification items can be dynamically rendered here */}
        
      </div>
  )
}

export default NotificationPanel