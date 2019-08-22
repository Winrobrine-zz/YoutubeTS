import express from "express";
import routes from "../routes";

import * as userController from "../controllers/user";
import * as passportConfig from "../config/passport";

const router = express.Router();

router.get(
    routes.index,
    passportConfig.isAuthenticated,
    userController.account
);
router.get(
    routes.profile,
    passportConfig.isAuthenticated,
    userController.profile
);
router.get(
    routes.password,
    passportConfig.isAuthenticated,
    userController.password
);

export default router;
