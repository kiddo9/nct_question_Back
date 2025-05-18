import React from "react";
import { Link } from "react-router-dom";


const Notfound = () => {
  return (
    <div className="inset-0 w-full fixed z-50 bg-white flex flex-col justify-center items-center">
      <img
        src="/logo-icon.svg"
        alt="logo"
        className="w-16 h-16 mx-auto"
      />
      <header className="text-center flec flex-col gap-2">
        <h1 className="text-7xl font-bold text-gray-800">404</h1>
 
        <p className="text-5xl text-gray-600 mt-5 mb-2">Page Not Found</p>
        <span className="text-gray-600 text-xl">The page you are looking for does not exist</span>
      </header>

      <Link
        to="/admin/user/questions"
        className="flex justify-center items-center bg-[#6699ff] text-white px-2 py-4 font-semibold hover:shadow-2xl transition duration-300 ease-in rounded-lg mx-auto mt-4"
      >
        GO TO DASHBOARD
      </Link>
    </div>
  );
};

export default Notfound;
