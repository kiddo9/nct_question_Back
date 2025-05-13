import questionOptionModel from "../../models/question_options.js";

export const options = async (req, res) => {
  try {
    const fetchOptions = await questionOptionModel.findAll();

    if (fetchOptions.length <= 0) {
      return res.json({ status: false, message: "No data at the moment" });
    }

    return res.status(201).json({ status: true, opt: fetchOptions });
  } catch (error) {
    console.log(error);
  }
};
