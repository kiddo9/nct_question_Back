import React from "react";

const Warning = ({ Decline, Accept }) => {
  return (
    <div className=" bg-white flex mx-auto w-96 ro py-4">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <p className="text-red-500 font-bold">
          Are you sure you want to delete?
        </p>
        <div className="flex justify-between w-96 gap-10 px-10 mt-10">
          <button
            onClick={Accept}
            className="bg-red-500 text-white w-44 px-4 py-2 rounded-lg"
          >
            Yes
          </button>
          <button
            onClick={Decline}
            className="bg-[#6699ff] text-white w-44 px-4 py-2 rounded-lg"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Warning;
