import { useEffect } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import Api from "../api/Api";

const Auth = () => {
  const nav = useNavigate();
  useEffect(() => {
    const checktoken = async () => {
      try {
        const send = await Api.get("/");
        if (send.data.status !== true) {
          nav("/auth/admin/login");
          return;
        }

        nav("/admin/user/questions");
      } catch (error) {
        console.log(error);
        nav("/auth/admin/login");
      }
    };

    checktoken();
  }, [nav]);
  return (
    <div>
      <Loader />
    </div>
  );
};

export default Auth;
