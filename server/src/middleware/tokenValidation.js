import jwt from "jsonwebtoken";
import usersModel from "../../models/users.js";
const tokenValidation = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token || token === undefined) {
    res
      .status(401)
      .json({ status: false, message: "access denied. unauthorized access" });

    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decode;

    if (decode.verified == true) {
      next();
      return;
    }
    res
      .status(401)
      .json({ status: false, message: "access denied. unauthorized access" });
  } catch (error) {
    console.log(error);
    await usersModel.update(
      { loggedIn: 0 },
      {
        where: {
          id: req.user.id,
        },
      }
    );
  }
};

export default tokenValidation;
