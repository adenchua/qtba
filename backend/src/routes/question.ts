import { Router } from "express";

import {
  createQuestion,
  getQuestionsByIds,
  increaseVote,
  updateQuestion,
  deleteQuestion,
} from "../controllers/question";

const router = Router();

router.route("/").post(createQuestion);
router.route("/bulk-retrieve").post(getQuestionsByIds);
router.route("/").patch(updateQuestion);
router.route("/votes").post(increaseVote);
router.route("/").delete(deleteQuestion);

export default router;
