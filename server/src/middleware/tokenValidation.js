import jwt from "jsonwebtoken";
import usersModel from "../../models/users.js";
const tokenValidation = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token || token === undefined) {
    res.json({ status: false, message: "access denied. unauthorized access" });

    return;
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      res.json({
        status: false,
        message: "access denied. unauthorized access",
      });
    }
    req.user = decode;

    const exist = await usersModel.findOne({
      where: {
        encryptedId: req.user.id,
      },
    });

    if (decode.verified == true && exist) {
      if (exist.loggedIn !== 1) {
        await usersModel.update(
          { loggedIn: 1 },
          {
            where: {
              encryptedId: req.user.id,
            },
          }
        );
      }
      console.log("checked");

      next();
      return;
    }
    res.json({ status: false, message: "access denied. unauthorized access" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      try {
        const decoded = jwt.decode(token);
        if (decoded?.id) {
          await usersModel.update(
            { loggedIn: 0 },
            { where: { encryptedId: decoded.id } }
          );
        }
      } catch (innerError) {
        console.error("Error decoding expired token:", innerError);
      }

      return res.status(401).json({
        status: false,
        message: "Session expired. Please log in again.",
      });
    }

    console.log(error);
  }
};

export default tokenValidation;
