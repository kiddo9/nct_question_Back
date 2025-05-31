import React from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

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
      // nav("/auth/admin/login");
      toast.error(
        "Seems like you have lost internet connection. Try again later."
      );
      console.error("Authentication error:", error);
    }
  };

  authUser();

  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export default Authentication;
