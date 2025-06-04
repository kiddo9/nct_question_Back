import React from "react";
import Pagination from "../components/Pagination";
import AddButton from "../components/AddButton";
import Users from "../components/UsersTable/Users";
import useAdminLists from "../hooks/adminLists";
import useRoleHook from "../hooks/roleHook";
import { ToastContainer } from "react-toastify";
import useAdminBlock from "../components/security/AdminBlock";

export const Admins = () => {
  const status = [
    { id: 1, name: "Total users", status: "a" },
    { id: 2, name: "verified users", status: "v" },
    { id: 3, name: "unverified users", status: "u" },
    { id: 4, name: "users without password", status: "" },
  ];

  const { users, loader } = useAdminLists();
  const { getRoles, loader: roleLoader } = useRoleHook();
  const {message, blocked} = useAdminBlock()

  if(blocked) return message
  
  return (
    <>
      <ToastContainer />
      <Users getUsers={users} getRoles={getRoles} status={status} loader={loader} roleLoader={roleLoader} />
    </>
  );
};
