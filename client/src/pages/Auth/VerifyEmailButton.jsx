import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Api from "../../api/Api";
import { ToastContainer, toast } from "react-toastify";

const VerifyEmailButton = () => {
  const nav = useNavigate();
  const [message, setmessage] = useState("");
  const [Token, setToken] = useState("");
  const [status, setStatus] = useState(true);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const token = query.get("verificationToken");

  useEffect(() => {
    async function getCredentials() {
      const response = await Api.get(
        `/email/Verification?verificationToken=${token}`
      );
      try {
        if (response.data.status == true) {
          setmessage(response.data.message);
          setToken(response.data.token);

          return;
        }
        setStatus(false);
        toast.error(response.data.message);
        setmessage(response.data.message);
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
        // nav('/auth/admin/login')
      }
    }
    getCredentials();
  }, [nav, token]);

  const verifyEmail = async () => {
    try {
      nav(`/auth/admin/reset?newPasswordSet=${Token}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <div className=" h-screen pb-10 pt-20 flex mx-auto">
      <ToastContainer />
      <div className="rounded-[20px] flex flex-col max-w-[400px] w-full slideDown p-10 transition-opacity duration-300 ease-in shadow-2xl h-fit bg-white/30 backdrop-blur-xs my-auto  mx-auto">
        <h1 className="text-3xl mx-auto font-bold">Email Verification</h1>
        <p className="text-sm mx-auto mb-5 ">
          {message || "something went wrong will processing your request"}
        </p>
        {status == true && (
          <button
            onClick={verifyEmail}
            className="bg-[#6699ff] hover:bg-blue-700 active:bg-blue-900 hover:shadow-lg transition duration-200 ease-in text-white font-bold py-2 max-h-[50px] mx-auto cursor-pointer w-full  px-4 rounded-lg"
          >
            Set password
          </button>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailButton;
