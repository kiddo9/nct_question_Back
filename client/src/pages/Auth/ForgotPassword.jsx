import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import { z } from "zod";
import Api from "../../api/Api";

const ForgotPassword = () => {
  const nav = useNavigate();
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");

  const validEmail = z
    .string()
    .email({ required_error: "Email is required", message: "Invalid email" }); //check if email is valid

  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    //send email to user to reset password
    try {
      const request = await Api.post("/admin/user/forgot-password", {
        email,
      });
      const response = request.data;
      if (response.status !== true) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setTimeout(() => {
        nav(`/auth/admin/verify?vt=${response.token}`); //enter the token here
      }, 1000);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className=" h-screen pb-10 pt-20 flex mx-auto">
      {loader && <Loader preload={true} />}
      <ToastContainer />
      <div className="rounded-[20px] max-w-[400px] w-full slideDown pt-5 transition-opacity duration-300 ease-in shadow-2xl h-fit bg-white/30 backdrop-blur-xs mx-auto">
        <header className=" w-full px-3 py-2 flex flex-row items-center bg-[#D7DDFF]">
          <img
            onClick={() => nav(-1)}
            className="cursor-pointer"
            src="/back-arrow.svg"
            alt="back arrow"
          />
          <h1 className="text-xl mx-auto font-bold">Forgot Password</h1>
        </header>
        <svg
          className="mx-auto mt-5"
          stroke="currentColor"
          fill="none"
          stroke-width="2"
          viewBox="0 0 24 24"
          stroke-linecap="round"
          stroke-linejoin="round"
          height="50px"
          width="50px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M15 21h-8a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10c.265 0 .518 .052 .75 .145"></path>
          <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"></path>
          <path d="M8 11v-4a4 4 0 1 1 8 0v4"></path>
          <path d="M19 22v.01"></path>
          <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"></path>
        </svg>
        <p className="text-xs mt-2 text-center">
          Enter your email to reset your password
        </p>
        <form className="px-3" onSubmit={handleSubmit}>
          <div className="mb-6 mt-6">
            <label for="password" className="form-label text-sm">
              Email
            </label>
            <div className="input-group flex border-2 border-[#6699ff]/30 bg-white/10 backdrop-blur-xs px-2 py-2 rounded-lg">
              <input
                type="email"
                className="outline-0 w-[90%]"
                id="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
          </div>

          <div className="flex flex-col mb-6 gap-2">
            <button
              disabled={!validEmail.safeParse(email).success}
              type="submit"
              className="w-full disabled:bg-[#6699ff]/30 bg-[#6699ff] active:bg-[#D7DDFF]  text-white font-bold rounded-md py-2 cursor-pointer hover:shadow-2xl transition duration-300 ease-in"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
