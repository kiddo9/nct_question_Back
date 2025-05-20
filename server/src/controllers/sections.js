import sections from "../../models/sections.js";

export const getAllSections = async (req, res) => {
  try {
    const fetchSections = await sections.findAll();

    if (fetchSections.length <= 0) {
      return res.json({ status: false, message: "No data at the moment" });
    }

    return res.status(201).json({
      status: true,
      sections: fetchSections,
    });
  } catch (error) {
    console.log(error);
  }
};

export const createSection = async (req, res) => {
  const { section } = req.body;

  try {
    if (!Array.isArray(section)) {
      return res.json({ status: false, message: "Unable to process request" });
    }

    if (section.length <= 0) {
      return res.json({ status: false, message: "Enter at least one section" });
    }

    // Create sections
    await Promise.all(
      section.map((position) =>
        sections.create({
          section_name: position,
          active_status: 1,
          created_by: 1,
          updated_by: 1,
          school_id: 1,
          academic_id: 1,
          un_academic_id: 1,
        })
      )
    );

    return res.json({
      status: true,
      message: "sections have been created successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};

export const deleteSection = async (req, res) => {
  const { id } = req.params;

  try {
    const checkForSection = await sections.findOne({ where: { id: id } });

    if (!checkForSection) {
      return res.json({
        status: false,
        message: "An error occurred will processing your request",
      });
    }

    const deleteSection = await sections.destroy({ where: { id: id } });

    if (!deleteSection) {
      return res.json({
        status: false,
        message: "unable to complete delete request",
      });
    }

    return res.json({
      status: true,
      message: "section have been deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "An error occurred" });
  }
};
