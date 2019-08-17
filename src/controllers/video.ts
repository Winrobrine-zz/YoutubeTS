import { Request, Response } from "express";

import { videos } from "../video";

export const home = (req: Request, res: Response) =>
    res.render("home", { title: "Home", videos });

export const search = (req: Request, res: Response) => {
    const {
        query: { term: searchingBy }
    } = req;

    res.render("search", { title: "Search", searchingBy });
};

export const upload = (req: Request, res: Response) =>
    res.render("videos/upload", { title: "Upload" });
export const videoDetail = (req: Request, res: Response) =>
    res.send("Video Detail");
export const edit = (req: Request, res: Response) =>
    res.render("videos/edit", { title: "Edit" });
export const remove = (req: Request, res: Response) =>
    res.render("videos/delete", { title: "Delete" });
