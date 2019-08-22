import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";
import { check } from "express-validator";
import { videoUpload } from "../config/multer";
import * as passportConfig from "../config/passport";

const router = express.Router();

router.get(
    routes.upload,
    passportConfig.isAuthenticated,
    videoController.getUpload
);
router.post(
    routes.upload,
    passportConfig.isAuthenticated,
    videoUpload.single("video"),
    [
        check("title", "Title cannot be blank")
            .not()
            .isEmpty()
    ],
    videoController.postUpload
);

router.get(routes.videoDetail(), videoController.detail);

router.get(
    routes.editVideo(),
    passportConfig.isAuthenticated,
    videoController.getEdit
);
router.post(
    routes.editVideo(),
    [
        check("title", "Title cannot be blank")
            .not()
            .isEmpty()
    ],
    videoController.postEdit
);

router.get(
    routes.deleteVideo(),
    passportConfig.isAuthenticated,
    videoController.remove
);

export default router;
