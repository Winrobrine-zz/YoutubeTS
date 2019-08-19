import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";
import { check } from "express-validator";
import { videoUpload } from "../config/multer";

const router = express.Router();

router.get(routes.upload, videoController.getUpload);
router.post(
    routes.upload,
    videoUpload.single("video"),
    [
        check("title", "Title cannot be blank")
            .not()
            .isEmpty()
    ],
    videoController.postUpload
);

router.get(routes.videoDetail(), videoController.detail);

router.get(routes.editVideo(), videoController.getEdit);
router.post(
    routes.editVideo(),
    [
        check("title", "Title cannot be blank")
            .not()
            .isEmpty()
    ],
    videoController.postEdit
);

router.get(routes.deleteVideo(), videoController.remove);

export default router;
