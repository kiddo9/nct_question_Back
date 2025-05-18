import React from "react";
import Pagination from "../components/Pagination";
import AddButton from "../components/AddButton";
import Users from "../components/UsersTable/Users";
import useAdminLists from "../hooks/adminLists";

export const Admins = () => {
  const status = [
    { id: 1, name: "Total users", status: "a" },
    { id: 2, name: "verified users", status: "v" },
    { id: 3, name: "unverified users", status: "u" },
    { id: 4, name: "users without password", status: "" },
  ];

  const { users } = useAdminLists();
  return (
    <>
      <Users getUsers={users} status={status} />
    </>
  );
};
