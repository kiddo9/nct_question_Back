import React from "react";
import Pagination from "../components/Pagination";
import AddButton from "../components/AddButton";
import Users from "../components/UsersTable/Users";

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
    <>
      <Users getUsers={users} status={status}/>
    </>
  );
};
