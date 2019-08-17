import { Request, Response } from "express";
import { validationResult } from "express-validator";
import routes from "../routes";

import { videos } from "../video";

export const home = (req: Request, res: Response) =>
    res.render("home", { title: "Home", videos });

export const search = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.index);
    }

    const {
        query: { keywords }
    } = req;

    res.render("search", { title: "Search", keywords, videos });
};

export const upload = (req: Request, res: Response) =>
    res.render("videos/upload", { title: "Upload" });
export const videoDetail = (req: Request, res: Response) =>
    res.send("Video Detail");
export const edit = (req: Request, res: Response) =>
    res.render("videos/edit", { title: "Edit" });
export const remove = (req: Request, res: Response) =>
    res.render("videos/delete", { title: "Delete" });
