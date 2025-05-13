import axios from "axios";

export const loginController = async (req, res) => {
  const { email, password, captchaToken } = req.body;
  if (!email || !password || !captchaToken) {
    return res.json({ status: false, message: "Please fill all fields" });
  }
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

  try {
    const response = await axios.post(verifyURL);
    const data = response.data;

    if (data.success) {
      res.json({ status: true, message: "CAPTCHA passed" });
    } else {
      res.status(400).json({ success: false, message: "CAPTCHA failed" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ status: false, error: "CAPTCHA verification failed" });
  }
};

export const verifyController = async (req, res) => {
  const { token } = req.body;
  const cookies = req.cookies.token;
  if (!cookies) {
    return res.json({ status: false });
  }

  if (!token) {
    return res.json({ status: false, message: "Please fill all fields" });
  }

  console.log(token);
};
