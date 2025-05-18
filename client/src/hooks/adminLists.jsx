import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Api from "../api/Api";

const useAdminLists = () => {
  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    const fetchAllUsers = async () => {
      try {
        const request = await Api.get("/admin/user/lists");
        const response = request.data;
        
        if (response.status === true) {
          setUsers(response.lists);
          return;
        }

        toast.error(response.message);
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Internal server error");
      }
      finally {
        setLoader(false);
      }
    };

    fetchAllUsers();
  }, []);
  return { users, loader };
};

export default useAdminLists;
