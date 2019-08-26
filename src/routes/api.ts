import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";

const router = express.Router();

router.patch(routes.videoView(), videoController.updateView);

export default router;
