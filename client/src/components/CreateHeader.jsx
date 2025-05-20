import React from 'react'
import { useNavigate } from 'react-router-dom';

const CreateHeader = ({children}) => {
    const navigate = useNavigate()
  return (
    <header className="bg-[#D7DDFF] w-full flex flex-row items-center px-4 py-2 shadow-md">
        <img onClick={() => navigate(-1)} className="cursor-pointer" src="/back-arrow.svg" alt="back arrow" />
        <h1 className="text-xl mx-auto">{children}</h1>
    </header>
  )
}

export default CreateHeader