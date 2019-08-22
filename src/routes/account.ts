import express from "express";
import routes from "../routes";

import * as userController from "../controllers/user";
import { ensureLoggedIn } from "connect-ensure-login";

const router = express.Router();

router.get(routes.index, ensureLoggedIn(routes.login), userController.account);
router.get(
    routes.profile,
    ensureLoggedIn(routes.login),
    userController.profile
);
router.get(
    routes.password,
    ensureLoggedIn(routes.login),
    userController.password
);

export default router;
