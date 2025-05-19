import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../api/Api";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    const checktoken = async () => {
      try {
        const send = await Api.get("/");
        if (send.data.status == true) {
          nav("/admin/user/questions");
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };

    checktoken();
  }, [nav]);

  //const sitekeyone = "6LcLITorAAAAAD3awuWCg4U3-I2tMwIKXv9-Vpcm";
  const sitekeyone = "6LeOHzorAAAAACA9rLeBi5ZVWDMAKsu62BAoaNh9";

  const handleSubmittion = async () => {
    setLoading(true);
    try {
      const response = await Api.post("/login", {
        email,
        password,
        captchaToken,
      });

      const responseData = response.data;
      if (responseData.status == true) {
        toast.success(responseData.message);
        setTimeout(() => {
          nav(`/auth/admin/verify?vt=${responseData.token}`);
        }, 3000);
        return;
      }

      if (responseData.status == false) {
        toast.error(responseData.message);
        return;
      }
    } catch (error) {
      toast.error("An error occurred while logging in");
      console.error("Error during login:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-screen h-screen "
      style={{
        backgroundImage: "url(/login-bg.svg",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="  pt-20 pb-10 flex mx-auto">
        <ToastContainer />
        {loading && <Loader preload={true} />}
        <div className="login-card bg-white/30 backdrop-blur-xs rounded-lg shadow-lg p-6 mx-auto">
          <div className="logo-container flex items-center">
            <img src="/NCT-MainLogo-2.png" alt="Company Logo" />
          </div>

          <div id="loginForm">
            <div className="mb-3 ">
              <label for="email" className="form-label">
                Email Address
              </label>
              <div className="flex border-2 border-[#6699ff] bg-white/10 backdrop-blur-xs px-2 py-2 rounded-lg">
                <input
                  type="email"
                  className=" w-[90%] outline-0 border-0 focus:outline-0"
                  id="email"
                  value={email}
                  placeholder="enter you email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
            </div>

            <div className="mb-6 mt-6">
              <label for="password" className="form-label">
                Password
              </label>
              <div className="input-group flex border-2 border-[#6699ff] bg-white/10 backdrop-blur-xs px-2 py-2 rounded-lg">
                <input
                  type="password"
                  className="outline-0 w-[90%]"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <span className="input-group-text relative">
                  {/* eye icon */}
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>

                  {/* slash eye icon */}
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
            </div>

            <div className="captcha-container border-[#6699ff] bg-white/10 backdrop-blur-xs">
              <label className="form-label">Security Verification</label>
              <div className="flex items-center mb-2">
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_CAPTCHA_SITE_KEY || sitekeyone}
                  onChange={(token) => setCaptchaToken(token)}
                />
              </div>
            </div>

            <div className="d-flex justify-content-between mb-3">
              <a href="#" className="text-primary text-decoration-none">
                Forgot password?
              </a>
            </div>

            <div className="flex flex-col  gap-2">
              <button
                type="submit"
                className="w-full bg-[#6699ff] text-white rounded-md py-2 cursor-pointer hover:shadow-2xl transition duration-300 ease-in"
                onClick={() => handleSubmittion()}
              >
                <i className="fas fa-sign-in-alt me-2"></i>Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
