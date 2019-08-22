import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import passport from "passport";
import routes from "../routes";
import { User } from "../models/User";
import "../config/passport";

export const getLogin = (req: Request, res: Response) => {
    if (req.user) return res.redirect(routes.index);

    res.render("login", { title: "Login" });
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successRedirect: routes.index
});

export const getSignup = (req: Request, res: Response) => {
    if (req.user) return res.redirect(routes.index);

    res.render("signup", { title: "Signup" });
};

export const postSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.signup);
    }

    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;

    try {
        await User.register(new User({ username, email }), password);
        next();
    } catch (err) {
        console.log(err);
        res.redirect(routes.signup);
    }
};

export const logout = (req: Request, res: Response) => {
    req.logout();
    res.redirect(routes.index);
};

export const userDetail = (req: Request, res: Response) => {
    res.send("User Detail");
};

export const account = (req: Request, res: Response) => {
    res.send("Account");
};

export const profile = (req: Request, res: Response) => {
    res.render("account/profile", { title: "Profile" });
};

export const password = (req: Request, res: Response) => {
    res.render("account/password", { title: "Password" });
};
