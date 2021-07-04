import { Router } from "express";

import { createModule, getModulesByIds } from "../controllers/module";

const router = Router();

router.route("/").post(createModule);
router.route("/bulk-retrieve").post(getModulesByIds);

export default router;
