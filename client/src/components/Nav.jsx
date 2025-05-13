import React from "react";
import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  const menus = [
    { id: 1, name: "Question list", path: "/admin/user/dash" },
    // { id: 2, name: "Create", path: "/admin/user/create" },
    { id: 3, name: "Users", path: "/admin/user/admins" },
    { id: 4, name: "create user", path: "/admin/user/create_admin" },
  ];

  const [open, setOpen] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  return (
    <div className="">
      <nav className="flex justify-between items-center p-4 fixed top-0 left-0 right-0 bg-white shadow-md z-10">
        <div className="flex items-center gap-4">
          <img
            src="/Screenshot 2025-04-30 at 2.11.36 PM.png"
            className="w-14 h-14 rounded-full object-cover"
            alt=""
          />
          <h1>Neo clouds technologies</h1>
        </div>

        <div className="md:flex hidden items-center gap-4">
          {menus.map((menu) => (
            <NavLink
              key={menu.id}
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-[#6699ff] rounded-lg drop-shadow-gry-300 drop-shadow-2xl py-2 px-3"
                  : "hover:bg-[#6699ff] transition-all duration-300 ease-in-out hover:text-white rounded-lg py-2 px-3"
              }
            >
              {menu.name}
            </NavLink>
          ))}
        </div>

        {/* notification icon */}
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
            onClick={() => setOpenNotification(!openNotification)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          <div className="md:flex items-center gap-2 hidden hover:bg-red-600 transition duration-300 ease-in-out hover:drop-shadow-2xl  cursor-pointer bg-red-500 px-3 py-2 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
              />
            </svg>
            <p className="text-white">Logout</p>
          </div>

          {/* mobile menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 md:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </nav>

      {/* mobile navigation bar */}
      <div
        className={`fixed ${
          open == true ? "translate-x-0 " : "translate-x-[100%]"
        } top-0 bottom-0 right-0 transition-all duration-200 ease-in-out bg-white shadow-md z-10 p-4 md:hidden justify-between items-center`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 float-end items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out hover:drop-shadow-2xl  cursor-pointer bg-red-500 text-white w-8 px-1 py-1 h-8 rounded-lg"
          onClick={() => setOpen(false)}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>

        <div className="md:hidden w-44 flex flex-col mt-20 gap-4">
          {menus.map((menu) => (
            <NavLink
              key={menu.id}
              to={menu.path}
              className={({ isActive }) =>
                isActive
                  ? "text-white bg-[#6699ff] rounded-lg drop-shadow-gry-300 drop-shadow-2xl py-2 px-3"
                  : "hover:bg-[#6699ff] transition-all duration-300 ease-in-out hover:text-white rounded-lg py-2 px-3"
              }
              onClick={() => setOpen(!open)}
            >
              {menu.name}
            </NavLink>
          ))}
        </div>

        <div className="flex absolute bottom-10 left-5 right-5 items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out hover:drop-shadow-2xl  cursor-pointer bg-red-500 px-3 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
          <p className="text-white">Logout</p>
        </div>
      </div>

      <div
        className={`${
          openNotification !== true ? "-z-40 opacity-0" : "z-40 opacity-100"
        } transition-opacity duration-150 ease-in-out absolute right-6 w-80 overflow-y-auto Scroll h-96 px-2 py-2 flex flex-col items-center shadow-md bg-white`}
      >
        {/* <p className="shadow-md bg-gray-300 w-72 rounded-lg p-4 mt-2">
          notification
        </p> */}

        <p className="mt-20">No notificatons yet</p>
      </div>
    </div>
  );
};

export default Nav;
