import axios from "axios"; // import axios for request
import usersModel from "../../../models/users.js"; // import the usermodel
import jwt from "jsonwebtoken"; //import the jwt module
import emailSender from "../../email/email.js"; //import the emailsender function
import Otp_Gen from "otp-generator";
import bcrypt from "bcrypt";

//Login controller authentication logic
export const loginController = async (req, res) => {
  //destructure the body
  const { email, password, captchaToken } = req.body;

  //check if details are empty and return response
  if (!email || !password || !captchaToken) {
    return res.json({ status: false, message: "Please fill all fields" });
  }

  //set google recaptcha comfirmation url
  const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`;

  try {
    //check if the user email exists in the database
    const userExist = await usersModel.findOne({ where: { email: email } });

    //return with status false if user does not exist
    if (!userExist) {
      res.json({ status: false, message: "authorization failed" });
      return;
    }

    const checkPasswordMatch = await bcrypt.compare(
      password,
      userExist.password
    );

    //return response if entered password those match the one  in the database
    if (!checkPasswordMatch) {
      res.json({
        status: false,
        message: "authurization failed. access denied",
      });
      return;
    }

    //validate the captcha token
    const response = await axios.post(verifyURL);
    const data = response.data;

    //return response if it falied
    if (data.success !== true) {
      res.status(400).json({ success: false, message: "CAPTCHA failed" });
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
    const otpType = "auth";

    //update otp otpExpiryTime and otpType
    const update = await usersModel.update(
      {
        otp: generateOtp,
        otpExpiryTime: otpExpiresIn,
        otpType: otpType,
      },
      { where: { encryptedId: userExist.encryptedId } }
    );

    //check if details where updated or return error if not
    if (!update) {
      res.json({ status: false, message: "something went wrong" });
      return;
    }

    //set user secert token for authenttication verification
    const token = jwt.sign(
      { email: userExist.email, id: userExist.encryptedId, type: otpType },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    //send Otp to user email
    emailSender({
      to: email,
      subject: "Auth OTP verification",
      emailType: "auth",
      otp: generateOtp,
      name: userExist.name,
    });

    //return successful response
    res.status(201).json({
      status: true,
      message: "authenication success",
      token: token,
    });
  } catch (err) {
    //throw error
    console.log(err);

    res.status(500).json({ status: false, error: "Request failed" });
  }
};

//otp validation and authorization logic
export const otpValidation = async (req, res) => {
  //destructure the body
  const { email, id, type, otp } = req.body;

  //using try catch block
  try {
    //validate email exists
    const validatedEmail = await usersModel.findOne({
      where: { email: email },
    });

    //return error if email does not exist
    if (!validatedEmail) {
      res.json({ status: false, message: "invalid request" });
      return;
    }

    //check if type is auth, reset or p-reset
    if (type == "auth" || type == "reset") {
      //return error if type is not matching
      if (validatedEmail.otpType !== type) {
        res.json({ status: false, message: "invalid Request" });
        return;
      }

      //check if the otps matches
      if (parseInt(otp) !== validatedEmail.otp) {
        res.json({ status: false, message: "Invalid or wrong OTP" });
        return;
      }

      //check if otp has expired
      if (new Date() > validatedEmail.otpExpiryTime) {
        res.json({ status: false, message: "Invalid otp expired" });
        return;
      }

      //create authentication token and store in cookies
      const createAuthToken = jwt.sign(
        { id: validatedEmail.encryptedId, verified: true },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "11h" } //expires in 11hrs
      );

      //send token for authorization
      res.cookie("token", createAuthToken, {
        httpOnly: true,
        secure: process.env.APP_MODE === "production",
        sameSite: "lax",
        maxAge: 11 * 60 * 60 * 1000,
      });

      //set logged in to 1
      await usersModel.update({ loggedIn: 1 }, { where: { encryptedId: id } });

      res.status(201).json({ status: true, id: validatedEmail.encryptedId });
    } else if (type == "p_reset") {
      return res.json({
        status: false,
        message: "feature still in production",
      });
    } else {
      res.json({ status: false, message: "invalid route" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "internal server error" });
  }
};

//create admin user account
export const createAdminUser = async (req, res) => {
  //destructure the request body
  const { name, email, role } = req.body;

  try {
    //check if there are details
    if (!name || !email || !role) {
      res.json({ status: false, message: "No detail was provided" });
      return;
    }

    //check if email entered already exist
    const emailAlreadyExists = await usersModel.findOne({
      where: { email: email },
    });

    //return response if true
    if (emailAlreadyExists) {
      return res.json({
        status: false,
        message: `email already inuse by ${emailAlreadyExists.name}`,
      });
    }

    //generate Otp
    const generateOtp = Otp_Gen.generate(7, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });

    //encryptedId generation
    const encryptedId = Otp_Gen.generate(25, {
      upperCaseAlphabets: true,
      specialChars: true,
      lowerCaseAlphabets: true,
      digits: true,
    });

    //set otpType to auth for authentication
    const otpType = "verify";

    //create user
    const createAdminUser = await usersModel.create({
      name,
      email,
      roles: role,
      email_verified: 0,
      otp: generateOtp,
      otpType: otpType,
      encryptedId,
    });

    //check if user was not create and return error
    if (!createAdminUser) {
      return res.json({ status: false, message: "unable to create user" });
    }

    //create token for link
    const token = jwt.sign(
      {
        email: email,
        otp: generateOtp,
        otpType: otpType,
        id: encryptedId,
      },
      process.env.JWT_SECRET_KEY
    );

    //send link to newly created user via email
    emailSender({
      to: email,
      emailType: "verify",
      subject: "Email verification",
      name: name,
      Preset: `${
        process.env.APP_MODE == "production"
          ? process.env.NGINX_PROD_ORIGIN
          : process.env.NGINX_LOCAL_ORIGIN
      }/email/verify?verificationToken=${token}`,
    });

    //return success response
    return res.json({
      status: true,
      message: `${name} details created. verification link sent`,
    });
  } catch (error) {
    console.error(error);
    res.json({ status: false, message: "internal server error" });
  }
};

//new user verification email
export const newUserEmailVerification = async (req, res) => {
  const token = req.query.verificationToken; // get the query params

  //using try catch block
  try {
    //return error if token does not exist
    if (!token) {
      return res.json({ status: false, message: "invalid request" });
    }

    //decode token
    const decodeUser = jwt.verify(token, process.env.JWT_SECRET_KEY);

    //return error if not a valid token
    if (!decodeUser) {
      return res.json({ status: false, message: "invalid request" });
    }

    //set decoded data
    req.user = decodeUser;

    //validate email exists
    const validatedEmail = await usersModel.findOne({
      where: { encryptedId: req.user.id },
    });

    //return error if email those not exist
    if (!validatedEmail) {
      return res.json({
        status: false,
        message: "Something went wrong while processing your request",
      });
    }

    if (req.user.email !== validatedEmail.email) {
      return res.json({
        status: false,
        message: "Something went wrong while processing your request",
      });
    }

    //check if otp type is verify
    if (req.user.otpType !== "verify") {
      return res.json({
        status: false,
        message: "we are unable to process your request. ",
      });
    }

    //match with database
    if (validatedEmail.otpType !== req.user.otpType) {
      return res.json({
        status: false,
        message: "we are unable to process your request",
      });
    }

    //check db if otp matches
    if (parseInt(req.user.otp) !== validatedEmail.otp) {
      return res.json({
        status: false,
        message: "unprocessable url",
      });
    }

    //check if email is already verified
    if (validatedEmail.email_verified == 1) {
      if (validatedEmail.password !== null) {
        return res.json({
          status: false,
          message: "Link has expired",
        });
      }
    }

    //update cred if email is not verified
    const updateEmailVerifiedStatus = await usersModel.update(
      { email_verified: 1 },
      { where: { encryptedId: req.user.id } }
    );

    //return error if cred was unable to update
    if (!updateEmailVerifiedStatus) {
      return res.json({
        status: false,
        message: "unable to verify email. Please try again",
      });
    }

    //create set password token
    const passwordSetToken = jwt.sign(
      { id: validatedEmail.encryptedId, type: "pass-set" },
      process.env.JWT_SECRET_KEY
    );

    //return reponse
    res.status(200).json({
      status: true,
      message:
        "Email verification successfull. Please click the button to create your password",
      token: passwordSetToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: false, message: "invalid request" });
  }
};

//controller to get list of users
export const usersList = async (req, res) => {
  try {
    const getListOfUsers = await usersModel.findAll();

    if (!getListOfUsers || getListOfUsers.length <= 0) {
      return res.json({ status: false, message: "no data found" });
    }

    return res.status(201).json({ status: true, lists: getListOfUsers });
  } catch (error) {
    console.log(error);
    res.status().json({ status: false, message: "internal server error" });
  }
};

//log out controller
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.APP_MODE === "production",
      sameSite: "lax",
    });

    res.json({ status: true });
  } catch (error) {
    console.log(error);
  }
};
