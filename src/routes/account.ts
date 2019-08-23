import express from "express";
import routes from "../routes";

import * as userController from "../controllers/user";
import { ensureLoggedIn } from "connect-ensure-login";
import { avatarUpload } from "../config/multer";
import { check } from "express-validator";
import { User } from "../models/User";

const router = express.Router();

router.get(routes.index, ensureLoggedIn(routes.login), userController.account);

router.get(
    routes.profile,
    ensureLoggedIn(routes.login),
    userController.getEditProfile
);
router.post(
    routes.profile,
    ensureLoggedIn(routes.login),
    avatarUpload.single("avatar"),
    [
        check("username", "Username cannot be blank")
            .not()
            .isEmpty(),
        check("username", "Username already exists").custom(
            async (value, { req }) => {
                const existingUser = await User.findOne({ username: value });
                if (existingUser && existingUser.id !== req.user.id)
                    return Promise.reject();
            }
        )
    ],
    userController.postEditProfile
);

router.get(
    routes.password,
    ensureLoggedIn(routes.login),
    userController.password
);

export default router;
