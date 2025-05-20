import questionGroups from "../../models/question_groups.js";
export const getAllQuestionGroups = async (req, res) => {
  try {
    const fetchQuestionGroups = await questionGroups.findAll();

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

  try {
    if (!Array.isArray(group)) {
      return res.json({ status: false, message: "Unable to process request" });
    }

    if (group.length <= 0) {
      return res.json({ status: false, message: "Enter at least one group" });
    }

    // Create groups
    await Promise.all(
      group.map((position) =>
        questionGroups.create({
          title: position,
          active_status: 1,
          created_by: 1,
          updated_by: 1,
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
