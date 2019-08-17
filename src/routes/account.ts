import express from "express";
import routes from "../routes";

import * as userController from "../controllers/user";

const router = express.Router();

router.get(routes.index, userController.account);
router.get(routes.profile, userController.profile);
router.get(routes.password, userController.password);

export default router;
