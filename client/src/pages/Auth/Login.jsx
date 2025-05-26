import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { ToastContainer, toast } from "react-toastify";
import Api from "../../api/Api";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import EyeToggle from "./EyeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
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
  // const sitekeyone = "6LeOHzorAAAAACA9rLeBi5ZVWDMAKsu62BAoaNh9";
  const sitekeyone = "6LeEtUkrAAAAAPF8buEmK7n9E89MixpuRVoI1Wu7";

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
    <div className="w-screen h-screen bg-[url('')] md:bg-[url('/login-bg.svg')] bg-no-repeat">
      <div className="pt-20 pb-10 flex mx-auto">
        <ToastContainer />
        {loading && <Loader preload={true} />}
        <div className="login-card  bg-white/50 backdrop-blur-xs rounded-lg shadow-lg p-6 mx-auto">
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
                  type={isPasswordVisible ? "text" : "password"}
                  className="outline-0 w-[90%]"
                  id="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />

                <EyeToggle
                  isPasswordVisible={isPasswordVisible}
                  setPasswordVisible={setPasswordVisible}
                />
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
              <a
                href="/auth/admin/forgot-password"
                className="text-primary text-decoration-none"
              >
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
