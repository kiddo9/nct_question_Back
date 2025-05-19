import express from "express";
const router = express.Router();

import {
  createAdminUser,
  loginController,
  Logout,
  newUserEmailVerification,
  otpValidation,
  usersList,
} from "../controllers/Auth/auth.js";
import {
  createQuestions,
  getAllQuestions,
  getEachQuestionById,
} from "../controllers/questionBank.js";
import {
  getAllQuestionGroups,
  getQuestionGroupById,
} from "../controllers/questionGroup.js";
import tokenVerify from "../middleware/tokenValidation.js";
import credValidation from "../middleware/credValidation.js";
import { getAllSections } from "../controllers/sections.js";
import { options } from "../controllers/opt.js";
import passwordTokenValidation from "../middleware/passwordTokenValidation.js";
import { passwordSetAndReset } from "../controllers/Auth/passwordSetandReset.js";
import { AllRoles, createRole } from "../controllers/roles.js";

router.get("/", tokenVerify, async (req, res) => {
  res.status(200).json({ status: true });
});
router.get("/validate", credValidation, async (req, res) => {
  return res.json({
    status: true,
    message: "an otp was sent to your email",
    cred: req.user,
  });
});
router.get(
  "/password/token/validator",
  passwordTokenValidation,
  async (req, res) => {
    res.status(200).json({ status: true });
  }
);

router.post("/login", loginController);
router.get("/questions/bank", tokenVerify, getAllQuestions);
router.get("/admin/user/lists", tokenVerify, usersList);
router.get("/admin/roles", tokenVerify, AllRoles);

router.get("/questions/group", tokenVerify, getAllQuestionGroups);
router.get("/sections", tokenVerify, getAllSections);
router.get("/opt", tokenVerify, options);

router.get("/email/verification", newUserEmailVerification);
router.get("/questions/group/:id", tokenVerify, getQuestionGroupById);
router.get("/question/bank/:id", tokenVerify, getEachQuestionById);

router.post("/auth/validate", credValidation, otpValidation);
router.post("/create/questions", tokenVerify, createQuestions);
router.post("/create/roles", tokenVerify, createRole);
router.post("/admin/create", tokenVerify, createAdminUser);
router.post("/logout", tokenVerify, Logout);

router.put("/password/update", passwordTokenValidation, passwordSetAndReset);
export default router;
