import React from "react";
import Pagination from "../components/Pagination";
import AddButton from "../components/AddButton";
import Users from "../components/UsersTable/Users";
import useAdminLists from "../hooks/adminLists";
import useRoleHook from "../hooks/roleHook";
import { ToastContainer } from "react-toastify";
import { useAuth } from "../components/security/Authentication";
import { LockKeyhole } from "lucide-react";

export const Admins = () => {
  const status = [
    { id: 1, name: "Total users", status: "a" },
    { id: 2, name: "verified users", status: "v" },
    { id: 3, name: "unverified users", status: "u" },
    { id: 4, name: "users without password", status: "" },
  ];

  const { users, loader } = useAdminLists();
  const { getRoles, loader: roleLoader } = useRoleHook();
  const {user} = useAuth();

  if (!user || !user.role || user.role != "admin") {
    return (
      <div className="flex flex-col items-center max-w-[100vw]  lg:w-[calc(100vw-245px)] justify-center h-[calc(100vh-100px)]">
        <LockKeyhole className="w-16 h-16 text-black mb-4" />
        <h1 className="text-2xl mx-auto text-center font-bold text-red-500">Access Denied</h1>
        <div className="text-center text-gray-500">
          You do not have permission to access this page. Please contact your administrator.
        </div>
      </div>
    );
  }
  return (
    <>
      <ToastContainer />
      <Users getUsers={users} getRoles={getRoles} status={status} loader={loader} roleLoader={roleLoader} />
    </>
  );
};
