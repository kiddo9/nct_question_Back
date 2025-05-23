import React, { useState } from "react";
import CreateHeader from "../../components/CreateHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { RotateCcwKey } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import Api from "../../api/Api";
import Loader from "../../components/Loader";
import EyeToggle from "./EyeToggle";

const PasswordRest = () => {
  const navigate = useNavigate();
  //const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();
  const token = query.get("newPasswordSet");

  useEffect(() => {
    const passwordValidateRequest = async () => {
      const requestTo = await Api.get(
        `/password/token/validator?newPasswordSet=${token}`
      );
      const response = requestTo.data;
      try {
        if (response.status == false) {
          //return error message or redirect but preferrable show error message
          console.log("not true");

          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    passwordValidateRequest();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoader(true);
    try {
      const requestTo = await Api.put(
        `/password/update?newPasswordSet=${token}`,
        {
          newPassword,
          confirmPassword,
        }
      );
      const response = requestTo.data;

      if (response.status !== true) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      setTimeout(() => {
        navigate("/auth/admin/login");
      }, 2000);
    } catch (error) {
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
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            src="/back-arrow.svg"
            alt="back arrow"
          />
          <h1 className="text-xl mx-auto font-bold">Reset Password</h1>
        </header>
        <RotateCcwKey className="mx-auto mt-5" size={50} />
        <p className="text-xs mx-auto text-center max-w-[300px] mt-2">
          Please Confirm changes to avoid getting locked out
        </p>
        <form className="px-3" onSubmit={handleSubmit}>
          {/* <div className="mb-6 mt-6">
            <label for="password" className="form-label text-sm">
              Current Password
            </label>
            <div className="input-group flex border-2 border-[#6699ff]/30 bg-white/10 backdrop-blur-xs px-2 py-2 rounded-lg">
              <input
                type="password"
                className="outline-0 w-[90%]"
                id="password"
                placeholder="Enter current password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                value={currentPassword}
              />

              <span className="input-group-text relative">
                {/* eye icon */}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 absolute"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg> */}

          {/* slash eye icon 
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6 absolute"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              </span>
            </div>
          </div> */}

          <div className="mb-6 mt-6">
            <label for="password" className="form-label text-sm">
              New Password
            </label>
            <div className="input-group flex border-2 border-[#6699ff]/30 bg-white/10 backdrop-blur-xs px-2 py-2 rounded-lg">
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="outline-0 w-[90%]"
                id="password"
                placeholder="New password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
              />

              <EyeToggle 
                isPasswordVisible={isPasswordVisible} 
                setPasswordVisible={setPasswordVisible} 
              />
            </div>
          </div>

          <div className="mb-6 mt-6">
            <label for="password" className="form-label text-sm">
              Confirm New Password
            </label>
            <div className="input-group flex border-2 border-[#6699ff]/30 bg-white/10 backdrop-blur-xs px-2 py-2 rounded-lg">
              <input
                type="password"
                className="outline-0 w-[90%]"
                id="password"
                placeholder="Confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
            </div>
          </div>

          <div className="flex flex-col mb-6 gap-2">
            <button
              disabled={!newPassword || !confirmPassword}
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

export default PasswordRest;
