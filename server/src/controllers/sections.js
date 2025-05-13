import seactions from "../../models/sections.js";

export const getAllSections = async (req, res) => {
  try {
    const fetchSections = await seactions.findAll();

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
