import passport from "passport";
import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import routes from "../routes";

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
