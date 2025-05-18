import React, { useState } from "react";
import Loader from "../../components/Loader";
import useValidation from "../../components/security/Validations";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [Input, setInput] = useState(["", "", "", "", "", ""]);
  const { load, email, id, type } = useValidation();
  const [loader, setLoader] = useState();
  const nav = useNavigate();

  const handleInput = (e, index) => {
    const newInputs = [...Input];
    newInputs[index] = e.target.value;

    if (index !== "") {
      const next = e.target.nextElementSibling;

      if (next) {
        next.focus();
      }
    } else {
      return (e.target.value = "");
    }

    setInput(newInputs);
  };

  const handleKeyUp = (e) => {
    const target = e.target;
    const key = e.key.toLowerCase();

    if (key == "backspace" || key == "delete") {
      target.value = "";
      const prev = target.previousElementSibling;
      if (prev) {
        prev.focus();
      }
      return;
    }
  };
  const otp = Input.join("");

  useEffect(() => {
    if (otp.length == 6) {
      const submittion = async () => {
        setLoader(true);
        try {
          const rerquestTo = await Api.post("/auth/validate", {
            email,
            id,
            type,
            otp,
          });

          const response = rerquestTo.data;

          if (response.status !== true) {
            toast.error(response.message);
            setInput(["", "", "", "", "", ""]);
            return;
          }

          toast.success('Successfully Authenticated');
          nav("/admin/user/questions");
        } catch (error) {
          console.log(error);
          toast.error("An error occourd");
        } finally {
          setLoader(false);
        }
      };

      submittion();
    }
  }, [otp.length, email, nav, id, type, otp]);

  return (
    <div className=" h-screen pb-10 pt-20 flex mx-auto">
      {load && <Loader />}
      {loader && <Loader preload={true} />}
      <ToastContainer />
      <div className="rounded-[20px] slideDown py-5 transition-opacity duration-300 ease-in shadow-2xl px-3 h-[27rem] bg-white/30 backdrop-blur-xs mx-auto">
        <div className="logo-container flex items-center">
          <img
            className="w-[400px] -mb-[3rem] mx-auto"
            src="/NCT-MainLogo-2.png"
            alt="Company Logo"
          />
        </div>

        <p className="text-center font-bold">Auth Verification</p>
        <div className="gap-2 mt-2 flex text-center flex-row justify-center py-3 px-3">
          {Input.map((input, index) => (
            <input
              onChange={(e) => handleInput(e, index)}
              key={index}
              value={input}
              maxLength={1}
              type="text"
              onKeyUp={(e) => handleKeyUp(e)}
              className="w-14 h-11 text-lg rounded-md text-center border-2 bg-white/10 border-[#6699ff] text-[#6699ff] focus:shadow-2xl  outline-none"
            />
          ))}
        </div>

        <div className="flex flex-col px-2 mt-10 gap-2">
          <button
            type="submit"
            className="w-full bg-[#6699ff] text-white rounded-md py-2"
          >
            <i className="fas fa-sign-in-alt me-2"></i>Sign In
          </button>
          <button
            type="submit"
            className="w-full flex gap-4 justify-center items-center text-black rounded-md py-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            resend Token
          </button>

          <p className="text-center">00:44</p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
