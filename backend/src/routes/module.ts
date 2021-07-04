import { Router } from "express";

import { createModule, getModuleBySlug, getModulesByIds } from "../controllers/module";

const router = Router();

router.route("/").post(createModule);
router.route("/bulk-retrieve").post(getModulesByIds);
router.route("/:slug").get(getModuleBySlug);

export default router;
