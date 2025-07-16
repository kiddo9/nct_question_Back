import questionGroups from "../../models/question_groups.js";
import rolesModel from "../../models/roles.js";
import usersModel from "../../models/users.js";

export const getAllQuestionGroups = async (req, res) => {
  const { id } = req.user;
  try {
    const user = await usersModel.findOne({
      where: { encryptedId: id },
    });

    if (!user) {
      return res.json({ status: false, message: "Unknown user" });
    }

    const requestInternRole = await rolesModel.findOne({
      where: { roles: "intern" },
    });

    let fetchQuestionGroups;

    if (Number(user.roles) == requestInternRole.id) {
      fetchQuestionGroups = await questionGroups.findAll({
        where: { created_by: user.id },
      });
    } else {
      fetchQuestionGroups = await questionGroups.findAll();
    }

    if (fetchQuestionGroups.length <= 0) {
      return res.json({ status: false, message: "No data at the moment" });
    }

    return res.status(201).json({
      status: true,
      questionGroups: fetchQuestionGroups,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getQuestionGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const fetchQuestionGroup = await questionGroups.findOne({
      where: {
        id: id,
      },
    });

    if (!fetchQuestionGroup) {
      return res.json({ status: false, message: "No data at the moment" });
    }

    return res.status(201).json({
      status: true,
      questionGroup: fetchQuestionGroup,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createGroup = async (req, res) => {
  const { group } = req.body;
  const user = req.user;
  try {
    if (!Array.isArray(group)) {
      return res.json({ status: false, message: "Unable to process request" });
    }

    if (group.length <= 0) {
      return res.json({ status: false, message: "Enter at least one group" });
    }

    const userResponsible = await usersModel.findOne({
      where: { encrypedId: user.id },
    });

    // Create groups
    await Promise.all(
      group.map((position) =>
        questionGroups.create({
          title: position,
          active_status: 1,
          created_by: userResponsible.id,
          updated_by: userResponsible.id,
          school_id: 1,
          academic_id: 1,
        })
      )
    );

    return res.json({
      status: true,
      message: "groups have been created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};

export const deleteGroup = async (req, res) => {
  const { id } = req.params;

  try {
    const checkForGroup = await questionGroups.findOne({ where: { id: id } });

    if (!checkForGroup) {
      return res.json({
        status: false,
        message: "An error occurred will processing your request",
      });
    }

    const deleteGroup = await questionGroups.destroy({ where: { id: id } });

    if (!deleteGroup) {
      return res.json({
        status: false,
        message: "unable to complete delete request",
      });
    }

    return res.json({
      status: true,
      message: "Group have been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};
