import React from 'react'

const CreateHeader = ({children}) => {
  return (
    <header className="bg-[#D7DDFF] w-full flex flex-row items-center px-4 py-2">
        <img src="/back-arrow.svg" alt="back arrow" />
        <h1 className="text-xl mx-auto">{children}</h1>
    </header>
  )
}

export default CreateHeader