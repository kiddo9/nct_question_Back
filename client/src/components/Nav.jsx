import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Api from "../api/Api";
import { toast } from "react-toastify";
import Loader from "./Loader";
import NotificationPanel from "./NotificationPanel";
import UserActionsPanel from "./UserActionsPanel";
import { ChevronDown, Plus } from "lucide-react";
import { useAuth } from "./security/Authentication";

const Nav = ({ children }) => {
  const {user} = useAuth()
  const menus = [
    { id: 1, name: "Questions", path: "/admin/user/questions" },
    { id: 2, name: "Section", path: "/admin/user/section" },
    { id: 3, name: "Users", path: "/admin/user/admins", admin: true },
    { id: 4, name: "Roles", path: "/admin/user/roles", admin: true },
    { id: 5, name: "Groups", path: "/admin/user/groups" },
    { id: 8, name: "Classes", path: "/admin/user/classes" },
    { id: 6, name: "Cbt-QR", path: "/admin/user/cbt-qr" },
    // { id: 7, name: "CbtSim", path: "/admin/user/cbt-sim" },
  ];

  const [open, setOpen] = React.useState(false);
  const [openNotification, setOpenNotification] = React.useState(false);
  const [openUserActions, setOpenUserActions] = React.useState(false);
  const [loader, setLoader] = useState(false);
  const nav = useNavigate();

  {
    /* Toogler between notification panel and user action panel*/
  }
  useEffect(() => {
    if (openUserActions) {
      setOpenNotification(false);
    }
  }, [openUserActions, setOpenNotification]);

  useEffect(() => {
    if (openNotification) {
      setOpenUserActions(false);
    }
  }, [openNotification, setOpenUserActions]);

  async function LogoutAdmin() {
    setLoader(true);
    try {
      const sendRequestTo = await Api.post("/logout");
      const response = sendRequestTo.data;

      if (response.status == true) {
        nav("/auth/admin/login");
        return;
      }

      toast.error("unable to logout. check your network connection");
    } catch (error) {
      console.log(error);
      toast.error("unable to logout. check your network connection");
    } finally {
      setLoader(false);
    }
  }
  return (
    <div className="">
      {loader && <Loader />}
      <header className="flex justify-between items-center p-4 bg-white sticky top-0 left-0 right-0  z-10 shadow-xl">
        <div className="flex items-center gap-4">
          <img src="/logo.svg" className="w-56 h-14 object-cover" alt="logo" />
        </div>

        <div className="flex items-center gap-4">
          {/* notification icon */}
          <button
              // onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center space-x-1 px-3 py-2 text-sm bg-[#6674BB] text-white rounded-lg hover:bg-[#6674BB]/80 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Actions</span>
              <ChevronDown className="w-4 h-4" />
           </button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer"
            onClick={() => setOpenNotification(!openNotification)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"
            />
          </svg>

          {/*User icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 cursor-pointer user-actions-panel"
            onClick={() => setOpenUserActions(!openUserActions)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 14.25c3.038 0 5.5-2.462 5.5-5.5S15.038 3.25 12 3.25 6.5 5.712 6.5 8.75s2.462 5.5 5.5 5.5zm0 1.5c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
            />
          </svg>

          {/* mobile menu icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 lg:hidden cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
      </header>

      {/* mobile navigation bar */}

      <div className="flex flex-1 lg:gap-56">
        <nav className="relative">
          <aside
            className={`fixed h-full z-40 bg-[#6674BB] ${
              open == true ? "translate-x-0 " : "-translate-x-[100%]"
            }  lg:translate-x-0 top-0 lg:top-22 w-52 transition-all duration-200 ease-in-out justify-between items-center `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6 fixed right-0 lg:hidden items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out hover:drop-shadow-2xl  cursor-pointer bg-red-500 text-white w-8 px-1 py-1 h-8 rounded-lg"
              onClick={() => setOpen(false)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
            <div className="flex   flex-col pl-4 gap-4 mt-20 lg:mt-20">
              {menus.filter((menu) => user && user.role && user.role.roles != 'admin' ? !menu.admin : true).map((menu) => (
                <NavLink
                  key={menu.id}
                  to={menu.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black bg-[#D7DDFF] rounded-tl-full  py-1 rounded-bl-full  px-1 w-full"
                      : ""
                  }
                  onClick={() => setOpen(!open)}
                >
                  <p className="bg-[#6674BB] w-36 text-gray-300 py-2 rounded-full px-4">
                    {menu.name}
                  </p>
                </NavLink>
              ))}

              {/* <div
                onClick={() => LogoutAdmin()}
                className="flex w-44 mt-20 bottom-0 left-5 right-5 items-center gap-2 hover:bg-red-600 transition duration-300 ease-in-out hover:drop-shadow-2xl  cursor-pointer bg-red-500 px-3 py-2 rounded-lg"
              >
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
              </div> */}
            </div>
          </aside>
        </nav>
        <div className="">{children}</div>
      </div>

      {/* Notification dropdown */}
      <NotificationPanel
        openNotification={openNotification}
        setOpenNotification={setOpenNotification}
      />

      {/* User actions dropdown */}
      <UserActionsPanel
        logoutAdmin={LogoutAdmin}
        openUserActions={openUserActions}
        setOpenUserActions={setOpenUserActions}
        openNotification={openNotification}
        setOpenNotification={setOpenNotification}
      />
    </div>
  );
};

export default Nav;
