import express from "express";
import routes from "../routes";

import * as videoController from "../controllers/video";
import * as userController from "../controllers/user";
import { check, sanitize } from "express-validator";
import { User } from "../models/User";

const router = express.Router();

router.get(routes.index, videoController.home);

router.get(routes.login, userController.getLogin);
router.post(routes.login, userController.postLogin);

router.get(routes.signup, userController.getSignup);
router.post(
    routes.signup,
    [
        check("username", "Username cannot be blank")
            .not()
            .isEmpty(),
        check("username", "Username already exists").custom(async value => {
            const isExist = await User.exists({ username: value });
            if (isExist) return Promise.reject();
        }),
        check("email", "Email is not valid").isEmail(),
        check(
            "password",
            "Password must be at least 4 characters long"
        ).isLength({
            min: 4
        }),
        check("confirmPassword", "Passwords do not match").custom(
            (value, { req }) => value === req.body.password
        ),
        sanitize("email").normalizeEmail({ gmail_remove_dots: false })
    ],
    userController.postSignup,
    userController.postLogin
);

router.get(routes.logout, userController.logout);
router.get(
    routes.search,
    [
        check(
            "keywords",
            "Keywords must be at least 2 characters long"
        ).isLength({
            min: 2
        })
    ],
    videoController.search
);

export default router;
