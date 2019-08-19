import { Request, Response } from "express";
import { validationResult } from "express-validator";
import routes from "../routes";
import { Video } from "../models/Video";
import { MulterOutFile } from "multer-blob-storage";

export const home = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find();
        res.render("home", { title: "Home", videos });
    } catch (err) {
        console.log(err);
        res.render("home", { title: "Home", videos: [] });
    }
};

export const search = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.index);
    }

    const keywords: string = req.query.keywords;

    try {
        const videos = await Video.find({
            title: { $regex: keywords, $options: "i" }
        });
        res.render("search", { title: "Search", keywords, videos });
    } catch (err) {
        console.log(err);
        res.redirect(routes.index);
    }
};

export const getUpload = (req: Request, res: Response) => {
    res.render("videos/upload", { title: "Upload" });
};

export const postUpload = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.videos + routes.upload);
    }

    const title: string = req.body.title;
    const description: string = req.body.description;
    const file = req.file as MulterOutFile;

    if (!file) {
        console.log("Only video files are allowed");
        return res.redirect(routes.videos + routes.upload);
    }

    try {
        const newVideo = await new Video({
            src: file.url.split("?")[0],
            title,
            description
        }).save();

        res.redirect(routes.videos + routes.videoDetail(newVideo.id));
    } catch (err) {
        console.log(err);
        res.redirect(routes.videos + routes.upload);
    }
};

export const detail = async (req: Request, res: Response) => {
    try {
        const video = await Video.findById(req.params.id);
        res.render("videos/detail", { title: video.title, video });
    } catch (err) {
        console.log(err);
        res.redirect(routes.index);
    }
};

export const getEdit = async (req: Request, res: Response) => {
    try {
        const video = await Video.findById(req.params.id);
        res.render("videos/edit", { title: `Edit ${video.title}`, video });
    } catch (err) {
        console.log(err);
        res.redirect(routes.index);
    }
};

export const postEdit = async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.redirect(routes.videos + routes.editVideo(req.params.id));
    }

    const title: string = req.body.title;
    const description: string = req.body.description;

    try {
        const video = await Video.findByIdAndUpdate(req.params.id, {
            title,
            description
        });
        res.redirect(routes.videos + routes.videoDetail(video.id));
    } catch (err) {
        console.log(err);
        res.redirect(routes.videos + routes.editVideo(req.params.id));
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await Video.findByIdAndDelete(req.params.id);
        res.redirect(routes.index);
    } catch (err) {
        console.log(err);
        res.redirect(routes.videos + routes.videoDetail(req.params.id));
    }
};
