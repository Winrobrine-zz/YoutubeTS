import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import passport from "passport";
import routes from "../routes";
import { User } from "../models/User";
import "../config/passport";
import { MulterOutFile } from "multer-blob-storage";

export const getLogin = (req: Request, res: Response) => {
    if (req.user) return res.redirect(routes.index);

    res.render("login", { title: "Login" });
};

export const postLogin = passport.authenticate("local", {
    failureRedirect: routes.login,
    successReturnToOrRedirect: routes.index,
    failureFlash: "You failed logged in.",
    successFlash: "Success! You are logged in."
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
        req.flash(
            "error",
            errors
                .array()
                .map(e => e.msg)
                .join("<br/>")
        );
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

export const userDetail = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id).populate("videos");
        if (user) res.render("users/detail", { title: "User Detail", user });
        else res.redirect(routes.index);
    } catch (err) {
        console.log(err);
        res.redirect(routes.index);
    }
};

export const account = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.user.id).populate("videos");
        res.render("users/detail", {
            title: "Account",
            user,
            isAccount: true
        });
    } catch (err) {
        console.log(err);
        res.redirect(routes.index);
    }
};

export const getProfile = (req: Request, res: Response) => {
    res.render("account/profile", { title: "Profile" });
};

export const postProfile = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash(
            "error",
            errors
                .array()
                .map(e => e.msg)
                .join("<br/>")
        );
        return res.redirect(routes.account + routes.profile);
    }

    const username: string = req.body.username;
    const file = req.file as MulterOutFile;

    try {
        req.user.username = username;
        req.user.avatarUrl = file ? file.url.split("?")[0] : req.user.avatarUrl;
        await req.user.save();
        req.flash("success", "Profile information has been updated.");
        res.redirect(routes.account);
    } catch (err) {
        console.log(err);
        res.redirect(routes.account + routes.profile);
    }
};

export const getPassword = (req: Request, res: Response) => {
    res.render("account/password", { title: "Password" });
};

export const postPassword = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        req.flash(
            "error",
            errors
                .array()
                .map(e => e.msg)
                .join("<br/>")
        );
        return res.redirect(routes.account + routes.password);
    }

    const oldPassword: string = req.body.oldPassword;
    const newPassword: string = req.body.newPassword;

    try {
        await req.user.changePassword(oldPassword, newPassword);
        req.flash("success", "Password has been changed.");
        res.redirect(routes.account);
    } catch (err) {
        console.log(err);
        res.redirect(routes.account + routes.password);
    }
};
