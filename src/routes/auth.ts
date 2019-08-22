import express from "express";
import passport from "passport";
import routes from "../routes";

const router = express.Router();

router.get(routes.github, passport.authenticate("github"));
router.get(
    routes.githubCallback,
    passport.authenticate("github", {
        failureRedirect: routes.login,
        successReturnToOrRedirect: routes.index
    })
);
router.get(
    routes.google,
    passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
    routes.googleCallback,
    passport.authenticate("google", {
        failureRedirect: routes.login,
        successReturnToOrRedirect: routes.index
    })
);

export default router;
