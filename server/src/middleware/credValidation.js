import jwt from "jsonwebtoken";

const jwtValidation = async (req, res, next) => {
  const vtToken = req.query.vt;

  try {
    if (!vtToken) {
      return res.json({ status: false, message: "token no provided" });
    }

    const decode = jwt.verify(vtToken, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.json({ status: false, message: "invalid request" });
    }
    req.user = decode;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired");
      return res.json({ status: "expired", message: "token expired" });
    }
    console.log(error);
    return res.json({ status: false });
  }
};

export default jwtValidation;
