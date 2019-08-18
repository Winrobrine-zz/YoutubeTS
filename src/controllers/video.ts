import { Request, Response } from "express";
import { validationResult } from "express-validator";
import routes from "../routes";
import { Video } from "../models/Video";
import { removeListener } from "cluster";

export const home = (req: Request, res: Response) => {
    Video.find()
        .then(videos => {
            res.render("home", { title: "Home", videos });
        })
        .catch(err => {
            console.log(err);
            res.render("home", { title: "Home", videos: [] });
        });
};

export const search = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.index);
    }

    const keywords: string = req.query.keywords;

    Video.find({ title: { $regex: keywords, $options: "i" } })
        .then(videos => {
            res.render("search", { title: "Search", keywords, videos });
        })
        .catch(err => {
            console.log(err);
            res.redirect(routes.index);
        });
};

export const getUpload = (req: Request, res: Response) => {
    res.render("videos/upload", { title: "Upload" });
};

export const postUpload = (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.upload);
    }

    res.redirect(routes.videos + routes.videoDetail("324393"));
};

export const videoDetail = (req: Request, res: Response) => {
    res.send("Video Detail");
};

export const edit = (req: Request, res: Response) => {
    res.render("videos/edit", { title: "Edit" });
};

export const remove = (req: Request, res: Response) => {
    res.render("videos/delete", { title: "Delete" });
};
