import React, { useState } from "react";
import Loader from "../../components/Loader";
import useValidation from "../../components/security/Validations";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const [Input, setInput] = useState(["", "", "", "", "", ""]);
  const { load, email, id, type, token, expiryTime } = useValidation();
  const [loader, setLoader] = useState();
  const [resend, setResend] = useState(false);
  const [delay, setDelay] = useState(false);
  const [time, setTime] = useState("00:00");
  const storedTime = localStorage.getItem("coolDownTime");
  const nav = useNavigate();
  

  const handleInput = (e, index) => {
    const newInputs = [...Input];
    newInputs[index] = e.target.value.replace(/\D+/g, "").slice(-1);

    if (newInputs[index] && index < 5) {
      e.target.nextElementSibling?.focus();
    }

    setInput(newInputs);
  };

  const handleKeyDown = (e) => {
    const { value, previousElementSibling } = e.target;

    if (e.key === "Backspace" && value === "") {
      previousElementSibling?.focus();
    }
  };

  const otp = Input.join("");

  useEffect(() => {
    if (otp.length == 6) {
      const submittion = async () => {
        setLoader(true);
        try {
          const rerquestTo = await Api.post(`/auth/validate?vt=${token}`, {
            otp,
          });

          const response = rerquestTo.data;

          if (response.status !== true) {
            toast.error(response.message);
            setInput(["", "", "", "", "", ""]);
            document.getElementById("otp-1").focus();
            
            return;
          }

          if (response.status == true && response.type == "reset") {
            toast.success(response.message);
            setTimeout(() => {
              nav(`/auth/admin/email-notify?vt=${token}`);
            }, 1000)
            return;
          }

          toast.success("Successfully Authenticated");
          setDelay(true);
          setTimeout(() => {
            setDelay(false);
            localStorage.removeItem("coolDownTime");
            nav("/admin/user/questions");
          }, 1000)
        } catch (error) {
          console.log(error);
          toast.error("An error occourd");
          nav("/admin/user/questions");
        } finally {
          setLoader(false);
        }
      };

      submittion();
    }
  }, [otp.length, email, token, nav, id, type, otp]);

  const resendToken = async () => {
    setResend(true);
    try {
      const requestTo = await Api.get(`/otp/resend?vt=${token}`);

      const response = requestTo.data;

      if (response.status !== true) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      startCountDown(response.coolDownTime );
      localStorage.setItem("coolDownTime", response.coolDownTime);  
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while resending the token");
    } finally {
      setResend(false);
      
    }
  }

  
  const startCountDown = (time) => {
    const countDownDate = new Date(time).getTime();
    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setTime(`${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
      if (distance < 0) {
        clearInterval(x);
        setTime("00:00");
      }
    }, 1000);
  }

  useEffect(() => {
    
    if (storedTime) {
      const storedTimeDate = new Date(storedTime);
      const now = new Date();
      if (storedTimeDate < now) {
        localStorage.removeItem("coolDownTime");
        return;
      }
      startCountDown(storedTime);

      return;
    }
    if (expiryTime) {
      startCountDown(expiryTime);
    }
  }, [expiryTime, storedTime]);

 
  return (
    <div className=" h-screen pb-10 pt-20 flex mx-auto">
      {load || delay && <Loader />}
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
              id={`otp-${index + 1}`}
              maxLength={1}
              type="text"
              onKeyDown={(e) => handleKeyDown(e)}
              className="w-14 h-11 text-lg rounded-md text-center border-2 bg-white/10 border-[#6699ff] text-[#6699ff] focus:shadow-2xl  outline-none"
            />
          ))}
        </div>

        <div className="flex flex-col px-2 mt-10 gap-2">
          <button
            type="submit"
            className="w-full bg-[#6699ff] text-white rounded-md py-2 cursor-pointer hover:bg-[#6699ff]/90 transition-colors duration-300"
          >
            <i className="fas fa-sign-in-alt me-2"></i>Sign In
          </button>
          <button
            onClick={resendToken}
            disabled={time !== "00:00" || resend}
            className="w-full flex gap-2 justify-center items-center text-black rounded-md py-2 cursor-pointer hover:bg-white/90 transition-colors duration-300 border-2 border-[#6699ff] hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              style={resend ? { animation: "spin .5s linear infinite" } : {}}
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
            {resend ? "Resending..." : "Resend OTP"}
          </button>

          <p className="text-center"> Expires in: {time}</p>
        </div>
      </div>
    </div>
  );
};

export default Verify;
