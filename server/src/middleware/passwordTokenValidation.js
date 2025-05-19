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
      return res.json({ status: false });
    }

    const checkId = await usersModel.findAll({
      where: { encryptedId: req.user.id },
    });

    if (!checkId) {
      return res.json({ status: false });
    }

    if (decode.type !== "pass-set" && decode.type !== "P-reset") {
      return res.json({ status: false });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ status: false });
  }
};

export default passwordTokenValidation;
