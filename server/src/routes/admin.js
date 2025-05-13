import express from "express";
const router = express.Router();

import { loginController } from "../controllers/Auth/auth.js";
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
import { getAllSections } from "../controllers/sections.js";
import { options } from "../controllers/opt.js";

router.get("/", tokenVerify);
router.post("/login", loginController);
router.get("/questions/bank", getAllQuestions);

router.get("/questions/group", getAllQuestionGroups);
router.get("/sections", getAllSections);
router.get("/opt", options);
router.get("/questions/group/:id", getQuestionGroupById);
router.get("/question/bank/:id", getEachQuestionById);

router.post("/create/questions", createQuestions);
export default router;
