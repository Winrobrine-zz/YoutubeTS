import express from "express";
import passport from "passport";
import routes from "../routes";

const router = express.Router();

router.get(routes.github, passport.authenticate("github"));
router.get(
    routes.githubCallback,
    passport.authenticate("github", {
        failureRedirect: routes.login,
        successRedirect: routes.index
    })
);

export default router;
