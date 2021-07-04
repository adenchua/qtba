import { Router } from "express";

import { createQuestion, getQuestionsByIds } from "../controllers/question";

const router = Router();

router.route("/").post(createQuestion);
router.route("/bulk-retrieve").post(getQuestionsByIds);

export default router;
