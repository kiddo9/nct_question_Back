import rolesModel from "../../models/roles.js";
import usersModel from "../../models/users.js";

const roleBasedAuthenticationMiddleware = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await usersModel.findOne({
      where: { encryptedId: id },
    });

    if (!user) {
      return res.json({ status: false, message: "Unknown user" });
    }

    const requestAdminRole = await rolesModel.findOne({
      where: { roles: "admin" },
    });

    if (Number(user.roles) !== requestAdminRole.id) {
      return res.json({
        status: false,
        message: "Unauthorized access. Admins only",
      });
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export default roleBasedAuthenticationMiddleware;
