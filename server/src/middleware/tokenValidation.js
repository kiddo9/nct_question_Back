import jwt from "jsonwebtoken";
const tokenValidation = (req, res, next) => {
  const token = req.cookies.token;

  if (!token || token === undefined) {
    res.status(401).json({ status: false, message: "access denied" });
    console.log("no token");

    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decode) {
      res.status(201).json({ status: true });
      console.log("yes token");
      next();
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export default tokenValidation;
