import express from "express";
const router = express.Router();

import {
  bulkDelete,
  createAdminUser,
  deleteUser,
  editAdmin,
  loggedInUsers,
  loginController,
  Logout,
  newUserEmailVerification,
  otpValidation,
  usersList,
} from "../controllers/Auth/auth.js";
import {
  createQuestions,
  deleteQuestion,
  getAllQuestions,
  getEachQuestionById,
  multiDeleteQuestion,
  updateQuestion,
} from "../controllers/questionBank.js";
import {
  createGroup,
  deleteGroup,
  getAllQuestionGroups,
  getQuestionGroupById,
} from "../controllers/questionGroup.js";
import tokenVerify from "../middleware/tokenValidation.js";
import credValidation from "../middleware/credValidation.js";
import {
  createSection,
  deleteSection,
  getAllSections,
} from "../controllers/sections.js";
import { options } from "../controllers/opt.js";
import passwordTokenValidation from "../middleware/passwordTokenValidation.js";
import { passwordSetAndReset } from "../controllers/Auth/passwordSetandReset.js";
import { AllRoles, createRole, deleteRole } from "../controllers/roles.js";
import { emailVerification } from "../controllers/Auth/emailValidation.js";
import roleBasedAuthenticationMiddleware from "../middleware/roleBasedAuthCheck.js";
import otpResend from "../controllers/Auth/OtpResend.js";
import {
  createNewClass,
  deleteClass,
  getAllClasses,
  updateClass,
} from "../controllers/classes.js";

router.get("/", tokenVerify, loggedInUsers);
router.get("/validate", credValidation, async (req, res) => {
  return res.json({
    status: true,
    message: "an otp was sent to your email",
    cred: req.user,
  });
});
router.get("/otp/resend", credValidation, otpResend);
router.get(
  "/password/token/validator",
  passwordTokenValidation,
  async (req, res) => {
    res.status(200).json({ status: true });
  }
);

router.post("/login", loginController);
router.get("/questions/bank", tokenVerify, getAllQuestions);
router.get(
  "/admin/user/lists",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  usersList
);
router.get("/admin/roles", [tokenVerify], AllRoles);

router.get("/questions/group", tokenVerify, getAllQuestionGroups);
router.get("/sections", tokenVerify, getAllSections);
router.get("/opt", tokenVerify, options);
router.get("/classes", tokenVerify, getAllClasses);

router.get("/email/verification", newUserEmailVerification);
router.get("/questions/group/:id", tokenVerify, getQuestionGroupById);
router.get("/question/bank/:id", tokenVerify, getEachQuestionById);

router.post("/auth/validate", credValidation, otpValidation);
router.post("/create/questions", tokenVerify, createQuestions);
router.post(
  "/create/roles",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  createRole
);
router.post(
  "/admin/create",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  createAdminUser
);
router.post(
  "/create/groups",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  createGroup
);
router.post(
  "/create/sections",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  createSection
);
router.post("/admin/user/forgot-password", emailVerification);
router.post(
  "/create/classes",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  createNewClass
);
router.post("/logout", tokenVerify, Logout);

router.put("/password/update", passwordTokenValidation, passwordSetAndReset);
router.put("/question/bank/update", tokenVerify, updateQuestion);
router.put(
  "/admin/user/update",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  editAdmin
);
router.put(
  "/classes/update",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  updateClass
);

router.delete("/questions/bank/delete/:id", tokenVerify, deleteQuestion);
router.delete("/questions/bank/multi/delete", tokenVerify, multiDeleteQuestion);
router.delete(
  "/admin/user/multi/delete",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  bulkDelete
);
router.delete(
  "/admin/user/delete/:id",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  deleteUser
);
router.delete(
  "/admin/role/delete/:id",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  deleteRole
);
router.delete(
  "/group/delete/:id",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  deleteGroup
);
router.delete(
  "/section/delete/:id",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  deleteSection
);
router.delete(
  "/classes/delete/:id",
  [tokenVerify, roleBasedAuthenticationMiddleware],
  deleteClass
);

export default router;
