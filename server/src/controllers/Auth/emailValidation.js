import usersModel from "../../../models/users.js";
import Otp_Gen from "otp-generator";
import jwt from "jsonwebtoken";
import emailSender from "../../email/email.js";

export const emailVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const validatedEmail = await usersModel.findOne({
      where: { email: email },
    });

    if (!validatedEmail) {
      res.json({
        status: false,
        message: "invalid email or email does not exist",
      });
      return;
    }

    //generate Otp
    const generateOtp = Otp_Gen.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    //set otp expiry time
    const otpExpiresIn = new Date(Date.now() + 180 * 1000); //expires in three minute
    //set otpType to auth for authentication
    const otpType = "reset";

    //update otp otpExpiryTime and otpType
    const update = await usersModel.update(
      {
        otp: generateOtp,
        otpExpiryTime: otpExpiresIn,
        otpType: otpType,
      },
      { where: { encryptedId: validatedEmail.encryptedId } }
    );

    //check if details where updated or return error if not
    if (!update) {
      res.json({ status: false, message: "something went wrong" });
      return;
    }

    //set user secert token for authenttication verification
    const token = jwt.sign(
      {
        email: validatedEmail.email,
        id: validatedEmail.encryptedId,
        time: otpExpiresIn,
        type: otpType,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    //send Otp to user email
    emailSender({
      to: email,
      subject: "Password reset email verification",
      emailType: "reset",
      otp: generateOtp,
      name: validatedEmail.name,
    });

    res.status(201).json({
      status: true,
      message: "otp sent to your email",
      token: token,
    });
  } catch (error) {
    console.log(error);
  }
};
