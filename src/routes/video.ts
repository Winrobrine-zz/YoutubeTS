import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";
import { check } from "express-validator";
import { videoUpload } from "../config/multer";
import { ensureLoggedIn } from "connect-ensure-login";

const router = express.Router();

router.get(
    routes.upload,
    ensureLoggedIn(routes.login),
    videoController.getUpload
);
router.post(
    routes.upload,
    ensureLoggedIn(routes.login),
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
    ensureLoggedIn(routes.login),
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
    ensureLoggedIn(routes.login),
    videoController.remove
);

export default router;
