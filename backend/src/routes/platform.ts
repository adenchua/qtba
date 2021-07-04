import { Router } from "express";

import { createPlatform, getPlatforms } from "../controllers/platform";

const router = Router();

router.route("/").post(createPlatform);
router.route("/").get(getPlatforms);

export default router;
