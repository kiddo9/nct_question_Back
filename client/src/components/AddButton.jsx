import React from 'react'

const AddButton = ({children}) => {
  return (
    <button className="px-4 py-2 cursor-pointer bg-[#6674BB] text-white rounded-lg flex items-center gap-2 hover:bg-[#6674BB] transition-colors">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>

    <span className="hidden sm:inline">{children}</span>
  </button>
  )
}

export default AddButton