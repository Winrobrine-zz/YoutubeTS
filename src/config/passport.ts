import passport from "passport";
import passportGithub from "passport-github";

import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import routes from "../routes";

const GithubStrategy = passportGithub.Strategy;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "/auth/github/callback",
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {}
    )
);

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(routes.login);
};
