import jwt from "jsonwebtoken";
import usersModel from "../../models/users.js";

const passwordTokenValidation = async (req, res, next) => {
  const token = req.query.newPasswordSet;

  try {
    if (!token) {
      return res.json({ status: false, message: "token no provided" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;

    if (!decode) {
      return res.json({ status: false, message: "invalid token" });
    }

    const checkId = await usersModel.findOne({
      where: { encryptedId: req.user.id },
    });

    if (!checkId) {
      return res.json({ status: false, message: "invalid user access" });
    }

    if (decode.type !== "pass-set" && decode.type !== "P-reset") {
      return res.json({ status: false, message: "invalid request" });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.log("Token expired");
      return res.json({ status: "expired", message: "token expired" });
    }
    console.log(error);
    res.json({ status: false });
  }
};

export default passwordTokenValidation;
