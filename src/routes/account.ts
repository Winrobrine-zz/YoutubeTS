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
    userController.getProfile
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
    userController.postProfile
);

router.get(
    routes.password,
    ensureLoggedIn(routes.login),
    userController.getPassword
);

router.post(
    routes.password,
    ensureLoggedIn(routes.login),
    [
        check(
            "newPassword",
            "Password must be at least 4 characters long"
        ).isLength({
            min: 4
        }),
        check("confirmNewPassword", "Passwords do not match").custom(
            (value, { req }) => value === req.body.newPassword
        )
    ],
    userController.postPassword
);

export default router;
