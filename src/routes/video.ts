import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";

const router = express.Router();

router.get(routes.upload, videoController.upload);
router.get(routes.videoDetail(), videoController.videoDetail);
router.get(routes.editVideo(), videoController.edit);
router.get(routes.deleteVideo(), videoController.remove);

export default router;
