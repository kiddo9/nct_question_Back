import questionBank from "../../models/Question_Bank.js";
import questionOptionModel from "../../models/question_options.js";

//controller to get all questions
export const getAllQuestions = async (req, res) => {
  let fetchQuestions;
  //using the try catch block
  try {
    //fetch all data from the database
    fetchQuestions = await questionBank.findAll();

    //check if the table is empty
    if (fetchQuestions.length <= 0) {
      return res.json({ status: false, message: "No data at the moment" });
    }

    //return successful message with data
    return res.status(201).json({ status: true, questions: fetchQuestions });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "server error" });
  }
};

//controller to get each question using id
export const getEachQuestionById = async (req, res) => {
  //destructure the paramter and get the id
  const { id } = req.params;
  try {
    //check if the id is empty
    if (!id) {
      return res.json({ status: false, message: "unauthorized access" });
    }

    //check if the id of the question exists
    const question = await questionBank.findOne({ where: { id: id } });

    //return error if it does not exist
    if (!question) {
      return res.json({
        status: false,
        message: "unable to fetch information",
      });
    }

    //return status true with the requested data
    return res.status(200).json({ status: true, question: question });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

//controller to create question
export const createQuestions = async (req, res) => {
  //destructure the body and retrive all data
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

  //using try catch block
  try {
    //if details are empty return error
    if (!type || !question || !mark || !QuaterId || !answer || !GroupId) {
      return res.json({ status: false, message: "unable to create question " });
    }

    //create the question
    const createQuestion = await questionBank.create({
      type,
      question,
      marks: mark,
      trueFalse: type == "T" ? answer : null, //check if the type is T for true or false question
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

    //if question was on able to create return error
    if (!createQuestion) {
      return res.json({
        status: "",
        message: "unable to create and and add question",
      });
    }

    //check is the type is M for muilt questions
    if (type == "M") {
      //check if the options is an array
      if (Array.isArray(options)) {
        //create and set answer in the options table
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
        //return error if options is not an array
        return res
          .status(422)
          .json({ status: false, message: "unprocessable content" });
      }
    }

    //return successful message
    return res.status(201).json({
      status: true,
      Id: createQuestion.id,
      message: "Question has been created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "internal error" });
  }
};

//controller to delete question
export const deleteQuestion = async (req, res) => {
  //destructure the request parameter and get id
  const { id } = req.params;

  //using the try catch block
  try {
    //if the id is empty return error
    if (!id) {
      return res.json({ status: false, message: "cannot perform request" });
    }

    //check if the id exist in the database
    const checkForQuestion = await questionBank.findOne({ where: { id: id } });

    //return error message if it does not exist
    if (!checkForQuestion) {
      return res.json({
        status: false,
        message: "can't delete question. data does not exist",
      });
    }

    //check if the question type is a multi choice type question
    if (checkForQuestion.type === "M") {
      // Check if the question has options
      const checkForQuestionOptions = await questionOptionModel.findAll({
        where: { question_bank_id: id },
      });

      // If options exist, delete them
      if (
        Array.isArray(checkForQuestionOptions) &&
        checkForQuestionOptions.length > 0
      ) {
        await questionOptionModel.destroy({ where: { question_bank_id: id } });
      }
    }

    //delete question from database
    const deleteQuestion = await questionBank.destroy({ where: { id: id } });

    //return response it if was not deleted
    if (!deleteQuestion) {
      return res.json({
        status: false,
        message: "delete request was not completed",
      });
    }

    //return successful message
    return res.json({
      status: true,
      message: "Question has been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: false, message: "internal server error" });
  }
};

//multiple delete question controller
export const multiDeleteQuestion = async (req, res) => {
  const { ids } = req.body;
  try {
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.json({ status: false, message: "invalid request" });
    }

    // Check if the questions exist
    const questions = await questionBank.findAll({
      where: { id: ids },
    });

    // If no questions found, return an error
    if (questions.length === 0) {
      return res.json({ status: false, message: "no questions found" });
    }

    // Delete options for each question
    await Promise.all(
      questions.map(async (question) => {
        if (question.type === "M") {
          await questionOptionModel.destroy({
            where: { question_bank_id: question.id },
          });
        }
      })
    );

    // Delete the questions
    const deleteCount = await questionBank.destroy({
      where: { id: ids },
    });

    // If no questions were deleted, return a message
    if (deleteCount === 0) {
      return res.json({ status: false, message: "unable to delete question" });
    }

    //return successful response
    return res.status(200).json({
      status: true,
      message: `${deleteCount} questions deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: "internal error" });
  }
};

//update question controller
export const updateQuestion = async (req, res) => {
  //destructure the request body and get all data
  const {
    id,
    type,
    question,
    mark,
    options,
    numberOfOptions,
    QuaterId,
    answer,
    GroupId,
  } = req.body;

  //use the try catch block
  try {
    //check if the required fields are empty
    if (
      !type ||
      !id ||
      !question ||
      !mark ||
      !QuaterId ||
      !answer ||
      !GroupId
    ) {
      //return error if any of the required fields are empty
      return res.json({ status: false, message: "unable to update question" });
    }

    //check if the question id exist in the database
    const checkForQuestion = await questionBank.findOne({ where: { id: id } });
    //return error if it does not exist
    if (!checkForQuestion) {
      return res.json({
        status: false,
        message: "unable to update question. data does not exist",
      });
    }
    //update the question in the database
    const updateQuestion = await questionBank.update(
      {
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
      },
      { where: { id: id } }
    );

    //check if the question was updated
    if (updateQuestion[0] === 0 || !updateQuestion) {
      return res.json({
        status: false,
        message: "unable to update and add question",
      });
    }

    //if the type is T for true or false question, check if options exist and delete them
    if (type == "T") {
      const checkIFOption = await questionOptionModel.findAll({
        where: { question_bank_id: id },
      });

      // if options exist, delete them
      if (checkIFOption) {
        await questionOptionModel.destroy({
          where: { question_bank_id: id },
        });
      }
    }

    //if the type is M for muilt questions, check if options is an array and has at least 2 options
    if (type == "M" && Array.isArray(options) && options.length >= 2) {
      await questionOptionModel.destroy({
        where: { question_bank_id: id },
      });

      //create and set answer in the options table
      await Promise.all(
        options.map((option) =>
          questionOptionModel.create({
            title: option,
            status: answer === option ? 1 : 0,
            active_status: 1,
            question_bank_id: id,
            created_by: 1,
            updated_by: 1,
            school_id: 1,
            academic_id: 1,
          })
        )
      );
    }

    //return successful message if the question was updated
    return res.status(201).json({
      status: true,
      message: "Question edited successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "internal error" });
  }
};
