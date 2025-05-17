import React from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";

const Authentication = ({ children }) => {
  const nav = useNavigate();
  const authUser = async () => {
    try {
      const requestAuth = await Api.get(`/`);

      if (requestAuth.data.status !== true) {
        nav("/auth/admin/login");
        return;
      }
    } catch (error) {
      nav("/auth/admin/login");
      console.log(error);
    }
  };

  authUser();
  return children;
};

export default Authentication;
