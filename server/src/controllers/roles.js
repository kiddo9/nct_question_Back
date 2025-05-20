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
      return res.json({ status: false, message: "Unable to process request" });
    }

    if (role.length <= 0) {
      return res.json({ status: false, message: "Enter at least one role" });
    }

    // Normalize all input roles to lowercase
    const normalizedRoles = role.map((r) => r.toLowerCase());

    // Check for duplicates
    for (const position of normalizedRoles) {
      const existing = await rolesModel.findOne({ where: { roles: position } });

      if (existing) {
        return res.json({
          status: false,
          message: `${position} already exists`,
        });
      }
    }

    // Create roles
    await Promise.all(
      normalizedRoles.map((position) => rolesModel.create({ roles: position }))
    );

    return res.json({
      status: true,
      message: "Roles have been created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};

export const deleteRole = async (req, res) => {
  const { id } = req.params;

  try {
    const checkForRole = await rolesModel.findOne({ where: { id: id } });

    if (!checkForRole) {
      return res.json({
        status: false,
        message: "An error occurred will processing your request",
      });
    }

    const deleteRole = await rolesModel.destroy({ where: { id: id } });

    if (!deleteRole) {
      return res.json({
        status: false,
        message: "unable to complete delete request",
      });
    }

    return res.json({
      status: true,
      message: "Roles have been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};
