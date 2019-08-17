import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";

const router = express.Router();

router.get(routes.index, videoController.videos);
router.get(routes.upload, videoController.upload);
router.get(routes.videoDetail, videoController.videoDetail);
router.get(routes.editVideo, videoController.editVideo);
router.get(routes.deleteVideo, videoController.deleteVideo);

export default router;
