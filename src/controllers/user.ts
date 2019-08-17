import { Request, Response } from "express";

export const signup = (req: Request, res: Response) =>
    res.render("signup", { title: "Signup" });
export const login = (req: Request, res: Response) =>
    res.render("login", { title: "login" });
export const logout = (req: Request, res: Response) => res.send("Logout");
export const users = (req: Request, res: Response) => res.send("Users");
export const userDetail = (req: Request, res: Response) =>
    res.send("User Detail");
export const editProfile = (req: Request, res: Response) =>
    res.send("Edit Profile");
export const password = (req: Request, res: Response) => res.send("Password");
