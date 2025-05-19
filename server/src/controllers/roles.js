import rolesModel from "../../models/roles.js";

export const AllRoles = async (req, res) => {
  try {
    const getAllRoles = await rolesModel.findAll();

    if (!getAllRoles) {
      return res.json({ status: false, message: "unable to get roles" });
    }

    return res.json({ status: true, roles: getAllRoles });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "an error occured" });
  }
};

export const createRole = async (req, res) => {
  const { role } = req.body;
  try {
    if (!Array.isArray(role)) {
      return res.json({ status: false, message: "unable to process request" });
    }
    if (role.length <= 0) {
      return res.json({ status: false, message: "enter a role" });
    }

    await Promise.all(
      role.map((positions) => {
        const checkExistance = rolesModel.findOne({
          where: { roles: positions.toLowerCase() },
        });

        if (checkExistance) {
          return res.json({
            status: false,
            message: `${checkExistance.roles} already exists`,
          });
        }
      })
    );

    await Promise.all(
      role.map((positions) => {
        rolesModel.create({
          roles: positions.toLowerCase(),
        });
      })
    );

    return res.json({ status: true, message: "roles has been created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "an error occured" });
  }
};
