import usersModel from "../../../models/users.js";
import bcrypt from "bcrypt";

export const passwordSetAndReset = async (req, res) => {
  const { newPassword, confirmPassword } = req.body;
  const id = req.user;

  try {
    // Validate input
    if (!newPassword || !confirmPassword) {
      return res.json({ status: false, message: "Enter a password." });
    }

    if (newPassword !== confirmPassword) {
      return res.json({ status: false, message: "Passwords do not match." });
    }

    // if (newPassword.length < 8) {
    //   return res.json({
    //     status: false,
    //     message: "Password should be at least 8 characters long.",
    //   });
    // }

    // Check link validity (only if it's a "pass-set" operation)
    if (id.type === "pass-set") {
      const userRecord = await usersModel.findOne({
        where: { encryptedId: id.id },
      });

      if (userRecord.password !== null) {
        return res.json({
          status: false,
          message:
            "Unable to process password change. It seems the link has expired.",
        });
      }
    }

    // Check if password is already in use
    const users = await usersModel.findAll();

    for (const user of users) {
      if (!user.password) continue;

      const isSamePassword = await bcrypt.compare(newPassword, user.password);
      if (isSamePassword) {
        return res.json({ status: false, message: "Password already in use." });
      }
    }

    // Hash and update password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updated = await usersModel.update(
      { password: hashedPassword },
      { where: { encryptedId: id.id } }
    );

    if (!updated) {
      return res.json({
        status: false,
        message: "Failed to update password. Please try again.",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Password has been set successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "An internal server error occurred.",
    });
  }
};
