import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../api/Api";

const useAdminLists = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const request = await Api.get("/admin/user/lists");
      const response = request.data;
      try {
        if (response.status === true) {
          setUsers(response.lists);
          return;
        }

        toast.error(response.message);
      } catch (error) {
        console.log(error);
        toast.error(response.message || "internal server error");
      }
    };

    fetchAllUsers();
  });
  return { users };
};

export default useAdminLists;
