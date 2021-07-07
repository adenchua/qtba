import { Router } from "express";

import { createModule, getModuleBySlug, getModulesByIds, resetModuleQuestionVotes } from "../controllers/module";

const router = Router();

router.route("/").post(createModule);
router.route("/bulk-retrieve").post(getModulesByIds);
router.route("/:slug").get(getModuleBySlug);
router.route("/questions-vote-reset").post(resetModuleQuestionVotes);

export default router;
