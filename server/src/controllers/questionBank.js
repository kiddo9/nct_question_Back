import questionBank from "../../models/Question_Bank.js";
import questionOptionModel from "../../models/question_options.js";

export const getAllQuestions = async (req, res) => {
  try {
    const fetchQuestions = await questionBank.findAll();

    if (fetchQuestions.length <= 0) {
      return res.json({ status: false, message: "No data at the moment" });
    }

    return res.status(201).json({ status: true, questions: fetchQuestions });
  } catch (error) {
    console.log(error);
  }
};

export const getEachQuestionById = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.json({ status: false, message: "unauthorized access" });
    }
    const question = await questionBank.findOne({ where: { id: id } });
    if (!question) {
      return res.json({
        status: false,
        message: "unable to fetch information",
      });
    }

    return res.status(200).json({ status: true, question: question });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

export const createQuestions = async (req, res) => {
  const {
    type,
    question,
    mark,
    options,
    numberOfOptions,
    QuaterId,
    answer,
    GroupId,
  } = req.body;

  try {
    if (
      !type ||
      !question ||
      !mark ||
      !options ||
      !numberOfOptions ||
      !QuaterId ||
      !answer ||
      !GroupId
    ) {
      return res.json({ status: false, message: "unable to create question " });
    }

    const createQuestion = await questionBank.create({
      type,
      question,
      marks: mark,
      trueFalse: type == "T" ? answer : null,
      suitable_words: null,
      number_of_option: numberOfOptions,
      active_status: 1,
      q_group_id: GroupId,
      class_id: 1,
      section_id: QuaterId,
      created_by: 1,
      updated_by: 1,
      school_id: 1,
      academic_id: 1,
    });

    if (!createQuestion) {
      return res.json({
        status: "",
        message: "unable to create and and add question",
      });
    }

    if (type == "M") {
      if (Array.isArray(options)) {
        await Promise.all(
          options.map((option) =>
            questionOptionModel.create({
              title: option,
              status: answer == option ? 1 : 0,
              active_status: 1,
              question_bank_id: createQuestion.id,
              created_by: 1,
              updated_by: 1,
              school_id: 1,
              academic_id: 1,
            })
          )
        );
      } else {
        return res
          .status(422)
          .json({ status: false, message: "unprocessable content" });
      }
    }

    return res.status(201).json({ status: true, Id: createQuestion.id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "internal error" });
  }
};
