import React from "react";

const BackButton = ({ path }) => {
  return (
    <div>
      <a href={path}>
        <button className="text-white bg-[#6699ff] gap-2 items-center flex rounded-lg drop-shadow-gry-300 drop-shadow-2xl py-2 px-3">
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
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          back
        </button>
      </a>
    </div>
  );
};

export default BackButton;
