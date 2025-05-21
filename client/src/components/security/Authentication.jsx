import React from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";

const Authentication = ({ children }) => {
  const nav = useNavigate();
  const authUser = async () => {
    try {
      const requestAuth = await Api.get(`/`);

      if (requestAuth.data.status !== true) {
        console.log("false");

        nav("/auth/admin/login");
        return;
      }
      console.log("checked");
    } catch (error) {
      nav("/auth/admin/login");
      console.log(error);
    }
  };

  authUser();

  setInterval(() => {
    authUser();
  }, 50000);
  return children;
};

export default Authentication;
