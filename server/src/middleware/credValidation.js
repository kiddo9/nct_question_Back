import jwt from "jsonwebtoken";

const jwtValidation = async (req, res, next) => {
  const vtToken = req.query.vt;
  console.log(vtToken);

  try {
    if (!vtToken) {
      return res.json({ status: false, message: "token no provided" });
    }

    const decode = jwt.verify(vtToken, process.env.JWT_SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
};

export default jwtValidation;
