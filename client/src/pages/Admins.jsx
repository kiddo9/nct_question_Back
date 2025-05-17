import React from "react";
import Pagination from "../components/Pagination";

export const Admins = () => {
  const status = [
    { id: 1, name: "Total users", status: "a" },
    { id: 2, name: "verified users", status: "v" },
    { id: 3, name: "unverified users", status: "u" },
    { id: 4, name: "users without password", status: "" },
  ];

  const users = [
    {
      id: 1,
      name: "Elechi paschal",
      role: "Developer",
      email: "Email@gmail.com",
      loggedIn: true,
      passwordSet: true,
      createdAt: "12/05/2025",
      status: "active",
    },
    {
      id: 2,
      name: "John Smith",
      role: "Designer",
      email: "john@example.com",
      loggedIn: false,
      passwordSet: true,
      createdAt: "10/05/2025",
      status: "inactive",
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Manager",
      email: "sarah@example.com",
      loggedIn: true,
      passwordSet: true,
      createdAt: "05/05/2025",
      status: "active",
    },
  ];
  return (
    <div className="w-full px-4  max-w-7xl mx-auto">
      <div className="border bg-white border-gray-300 py-3 rounded-2xl flex flex-col mt-5 gap-5 overflow-hidden">
        {/* Header with status filters and add button */}
        <div className="flex flex-col sm:flex-row justify-between px-4 sm:px-5 items-start sm:items-center gap-4 sm:gap-0">
          {/* Status filters */}
          <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 items-start">
            {status.map((stat) => (
              <div
                key={stat.id}
                className="flex justify-center items-center gap-2"
              >
                <div
                  className={`w-3 h-3 rounded-full ${
                    stat.status === "v"
                      ? "bg-green-500"
                      : stat.status === "u"
                      ? "bg-red-500"
                      : stat.status === "a"
                      ? "bg-[#6674BB]"
                      : "bg-gray-600"
                  }`}
                ></div>
                <p
                  className={`text-sm whitespace-nowrap ${
                    stat.status === "a" &&
                    "bg-[#6674BB] text-gray-100 px-3 py-1 rounded-xl"
                  }`}
                >
                  {stat.status === "a" && "10"} {stat.name}
                </p>
              </div>
            ))}
          </div>

          {/* Add user button */}
          <button className="px-4 py-2 bg-[#6674BB] text-white rounded-lg flex items-center gap-2 hover:bg-[#6674BB] transition-colors">
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

            <span className="hidden sm:inline">Add User</span>
          </button>
        </div>

        {/* Table */}
        <div className="w-full overflow-x-auto">
          {/* Table header */}
          <div className="lg:w-full w-[200%] bg-[#D7DDFF] py-4 px-4 sticky top-0">
            <div className="grid grid-cols-7 text-center font-medium text-sm sm:text-base">
              <p className="px-2">Name</p>
              <p className="px-2">Role</p>
              <p className="px-2">Email</p>
              <p className="px-2">LoggedIn</p>
              <p className="px-2">Password set</p>
              <p className="px-2">CreatedAt</p>
              <p className="px-2">Status</p>
            </div>
          </div>

          {/* Table body */}
          <div className="lg:w-full w-[200%]">
            {users.map((user) => (
              <div
                key={user.id}
                className="grid grid-cols-7 text-center py-4 px-4 text-sm sm:text-base border-b border-gray-100 hover:bg-gray-50"
              >
                <p className="px-2 truncate">{user.name}</p>
                <p className="px-2 truncate">{user.role}</p>
                <p className="px-2 truncate">{user.email}</p>
                <p className="px-2">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      user.loggedIn ? "bg-green-500" : "bg-gray-300"
                    } mr-1`}
                  ></span>
                  <span className="hidden sm:inline">
                    {user.loggedIn ? "online" : "offline"}
                  </span>
                </p>
                <p className="px-2">{user.passwordSet ? "true" : "false"}</p>
                <p className="px-2 truncate">{user.createdAt}</p>
                <p className="px-2">
                  <span
                    className={`inline-block px-2 py-1 rounded-full text-xs ${
                      user.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {user.status}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      Pagination
      {/* <Pagination
        totalItems={users.length}
        itemsPerPage={1}
        onPageChange={() => ""}
      /> */}
    </div>
  );
};
