import express from "express";
import routes from "../routes";

import * as userController from "../controllers/user";

const router = express.Router();

router.get(routes.index, userController.users);
router.get(routes.editProfile, userController.editProfile);
router.get(routes.password, userController.password);
router.get(routes.userDetail, userController.userDetail);

export default router;
