import { Op } from "sequelize";
import questionBank from "../../models/Question_Bank.js";
import questionOptionModel from "../../models/question_options.js";
import axios from "axios";

export const exportDbAutomatically = async (req, res) => {
  const { LastQuestionIndexId, LastQuestionOptionIndexId } = req.body;
  try {
    if (!LastQuestionIndexId || LastQuestionIndexId === "") {
      return res
        .status(400)
        .json({ status: false, message: "some arguments are missing" });
    }

    const checkIfQuestionExist = await questionBank.findOne({
      where: { id: LastQuestionIndexId },
    });
    const checkForOptions = await questionOptionModel.findOne({
      where: { id: LastQuestionOptionIndexId },
    });

    if (!checkIfQuestionExist && !checkForOptions) {
      return res
        .status(400)
        .json({ status: false, message: "index does not exist" });
    }

    const getAllQuestionsPayload = await questionBank.findAll({
      where: { id: { [Op.gt]: LastQuestionIndexId } },
    });

    const getAllQuestionsOptionPayload = await questionOptionModel.findAll({
      where: {
        id: { [Op.gt]: LastQuestionOptionIndexId },
      },
      attributes: { exclude: ["id"] },
    });

    const bundlePayLoad = {
      questions: getAllQuestionsPayload,
      options: getAllQuestionsOptionPayload,
    };

    const sendToNctCbt = await axios.post("", bundlePayLoad);
    const response = sendToNctCbt.data;

    if (response.success !== true) {
      return res.status(400).json({
        status: false,
        message: "something went wroong will handling your request",
      });
    }

    return res.status(201).json({
      status: true,
      message: `you have successfully dumped and exported ${getAllQuestionsPayload.length} questions and ${getAllQuestionsOptionPayload.length} options`,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};
