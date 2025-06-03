import usersModel from "../../../models/users.js";
const getAllUserName = async (req, res) => {
  try {
    const allUserName = await usersModel.findAll({
      attributes: ["id", "name"],
    });

    if (allUserName.length <= 0) {
      return res.json({ status: false, message: "No data at the moment" });
    }
    return res.status(201).json({
      status: true,
      users: allUserName,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};

export default getAllUserName;
