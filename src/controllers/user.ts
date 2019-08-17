import { Request, Response } from "express";

export const signup = (req: Request, res: Response) =>
    res.render("signup", { title: "Signup" });
export const login = (req: Request, res: Response) =>
    res.render("login", { title: "Login" });
export const logout = (req: Request, res: Response) => res.send("Logout");
export const userDetail = (req: Request, res: Response) =>
    res.send("User Detail");
export const account = (req: Request, res: Response) => res.send("Account");
export const profile = (req: Request, res: Response) =>
    res.render("account/profile", { title: "Profile" });
export const password = (req: Request, res: Response) =>
    res.render("account/password", { title: "Password" });
