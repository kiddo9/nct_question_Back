import usersModel from "../../../models/users.js"; // import the usermodel
import emailSender from "../../email/email.js"; //import the emailsender function
import Otp_Gen from "otp-generator";

const otpResend = async (req, res) => {
  const user = req.user;

  try {
    const userDetails = await usersModel.findOne({
      where: {
        encryptedId: user.id,
      },
    });
    //generate Otp
    const generateNewOtp = Otp_Gen.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    //set otp expiry time
    const otpExpiresIn = new Date(Date.now() + 180 * 1000); //expires in three minute

    //update the user with the new otp and expiry time
    const update = await usersModel.update(
      {
        otp: generateNewOtp,
        otpExpiryTime: otpExpiresIn,
        otpType: user.type,
      },
      {
        where: {
          encryptedId: user.id,
        },
      }
    );

    //check if the update was successful
    if (!update) {
      return res.json({
        status: false,
        message: "new otp request failed, please try again",
      });
    }

    const subject =
      user.type === "auth"
        ? "Auth OTP verification"
        : user.type === "reset"
        ? "Email verification"
        : "";

    emailSender({
      to: user.email,
      subject: subject,
      emailType: user.type,
      otp: generateNewOtp,
      name: userDetails.name,
    });
    return res.json({
      status: true,
      message: "new otp has been sent to your email",
      coolDownTime: otpExpiresIn,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: false,
      message: "An error occurred while processing your request.",
    });
  }
};

export default otpResend;
