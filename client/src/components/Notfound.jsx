import React from "react";

const Notfound = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col justify-center items-center">
      <img
        src="/Screenshot 2025-04-30 at 2.11.36 PM.png"
        alt="Not Found"
        className="w-20 h-20 rounded-full object-cover mb-10"
      />
      <div className="flex justify-center items-center">
        <h1 className="text-4xl font-bold text-gray-800">404</h1>
        <p className="text-lg text-gray-600">Page Not Found</p>
      </div>

      <a
        href="/admin/user/dash"
        className="flex justify-center items-center bg-[#6699ff] text-white w-32 h-10 rounded-lg mx-auto mt-4"
      >
        GO BACK
      </a>
    </div>
  );
};

export default Notfound;
