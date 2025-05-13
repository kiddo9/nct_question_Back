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
