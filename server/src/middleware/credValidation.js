import jwt from "jsonwebtoken";

const jwtValidation = async (req, res) => {
  const vtToken = req.query.vt;
  console.log(vtToken);

  try {
    if (!vtToken) {
      res.json({ status: false, message: "token no provided" });
    }

    const decode = jwt.verify(vtToken, process.env.JWT_SECRET_KEY);
    req.user = decode;

    res.json({
      status: true,
      message: "an otp was sent to your email",
      cred: req.user,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
};

export default jwtValidation;
