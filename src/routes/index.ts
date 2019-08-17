import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";
import * as userController from "../controllers/user";

const router = express.Router();

router.get(routes.index, videoController.home);
router.get(routes.signup, userController.signup);
router.get(routes.login, userController.login);
router.get(routes.logout, userController.logout);
router.get(routes.search, videoController.search);

export default router;
