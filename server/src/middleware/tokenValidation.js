import jwt from "jsonwebtoken";
import usersModel from "../../models/users.js";

const tokenValidation = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({
      status: false,
      message: "Access denied. Unauthorized access.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const decodedPayload = jwt.decode(token); // decode without verifying
        if (decodedPayload?.id) {
          await usersModel.update(
            { loggedIn: 0 },
            { where: { encryptedId: decodedPayload.id } }
          );
        }

        return res.json({
          status: "expired",
          message: "Session expired. Please log in again.",
        });
      }

      if (err.name === "JsonWebTokenError") {
        return res.json({
          status: false,
          message: "Access denied. Invalid token.",
        });
      }

      return res.json({
        status: false,
        message: "Access denied.",
      });
    }

    // If no error, the token is valid
    if (!decoded) {
      return res.json({
        status: false,
        message: "Access denied. Unauthorized access.",
      });
    }

    req.user = decoded;

    try {
      const user = await usersModel.findOne({
        where: {
          encryptedId: decoded.id,
        },
      });

      if (decoded.verified === true && user) {
        if (user.loggedIn !== 1) {
          await usersModel.update(
            { loggedIn: 1 },
            {
              where: {
                encryptedId: decoded.id,
              },
            }
          );
        }

        return next(); // All good, continue
      }

      return res.json({
        status: false,
        message: "Access denied. User not verified or not found.",
      });
    } catch (dbError) {
      console.error("Database error:", dbError);
      return res.status(500).json({
        status: false,
        message: "Internal server error.",
      });
    }
  });
};

export default tokenValidation;
