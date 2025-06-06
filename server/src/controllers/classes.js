import classesModel from "../../models/classes.js";
import usersModel from "../../models/users.js";

//get all classes controllers
export const getAllClasses = async (req, res) => {
  //using the try catch block
  try {
    //fetch all the classes from the database
    const fetchClasses = await classesModel.findAll();

    //check if its empty and return response
    if (fetchClasses.length <= 0) {
      res.json({ status: false, message: "no data found in the databases" });
      return;
    }

    //return successfull status with data
    return res.status(200).json({ status: true, classes: fetchClasses });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

export const createNewClass = async (req, res) => {
  const { classes } = req.body;
  const user = req.user;
  try {
    if (!Array.isArray(classes)) {
      return res.json({ status: false, message: "unexpected information" });
    }

    if (classes.length <= 0) {
      return res.json({ status: false, message: "no classes to create" });
    }

    const userResponsble = await usersModel.findOne({
      where: { encrypedId: user.id },
    });

    const createTheClass = await Promise.all(
      classes.map((cls) => {
        classesModel.create({
          class_name: cls.class_name,
          pass_mark: cls.mark,
          active_status: 1,
          created_by: userResponsble.id,
          updated_by: userResponsble.id,
          school_id: 1,
          academic_id: 1,
        });
      })
    );

    if (!createTheClass) {
      return res.json({ status: false, message: "unable to create classes" });
    }

    return res
      .status(201)
      .json({ status: true, message: "classes has been created successfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

export const updateClass = async (req, res) => {
  const { id, class_name, mark } = req.body;
  const user = req.user;
  try {
    const checkIfExist = await classesModel.findOne({ where: id });

    if (!checkIfExist) {
      return res.json({ status: false, message: "data not found" });
    }

    const userResponsble = await usersModel.findOne({
      where: { encrypedId: user.id },
    });

    const update = await classesModel.update(
      { class_name, pass_mark: mark, updated_by: userResponsble.id },
      { where: { id } }
    );

    if (!update) {
      return res.json({ status: false, message: "unable to update class" });
    }

    return res
      .status(201)
      .json({ status: true, message: "class has been updated successfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};

export const deleteClass = async (req, res) => {
  const { id } = req.params;
  try {
    const checkIfExist = await classesModel.findOne({ where: { id } });

    if (!checkIfExist) {
      return res.json({ status: false, message: "data not found" });
    }

    const deleteClass = await classesModel.destroy({ where: { id } });

    if (!deleteClass) {
      return res.json({ status: false, message: "unable to update class" });
    }
    return res
      .status(201)
      .json({ status: true, message: "class has been deleted successfull" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "internal server error" });
  }
};
