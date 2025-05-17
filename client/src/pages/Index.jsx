import React from "react";
import Table from "../components/Table";
import Loader from "../components/Loader";

const Index = () => {
  return (
    <div>
      <div className="">
        <header className="px-5 flex gap-6 flex-wrap items-center justify-between py-6">
          <p className="text-2xl font-medium">Question Bank</p>
          <a
            className="text-white bg-[#6699ff] gap-2 items-center flex rounded-lg drop-shadow-gry-300 drop-shadow-2xl py-2 px-3"
            href="/admin/user/create"
          >
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
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>

            <p>Create Question</p>
          </a>
        </header>

        <div className="px-5 flex gap-6 flex-wrap items-center justify-between py-6">
          <select
            name=""
            className="border-[#6699ff] border-2 cursor-pointer px-5 py-3 flex  w-96 justify-between"
            id=""
            onChange={(e) => localStorage.setItem("perPage", e.target.value)}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>

          <div className="w-96 bg-gray-50 border-2 border-[#6699ff] rounded-2xl flex items-center px-2 py-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
            <input
              type="text"
              placeholder="search"
              className="w-full px-2 py-2 focus:outline-0"
            />
          </div>
        </div>
      </div>
      <Table />
    </div>
  );
};

export default Index;
