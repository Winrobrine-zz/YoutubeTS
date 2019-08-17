import express from "express";
import routes from "../routes";

const router = express.Router();

router.get(routes.index, (req, res) => res.send("Videos"));
router.get(routes.upload, (req, res) => res.send("Upload"));
router.get(routes.videoDetail, (req, res) => res.send("Video Detail"));
router.get(routes.editVideo, (req, res) => res.send("Edit Video"));
router.get(routes.deleteVideo, (req, res) => res.send("Delete Video"));

export default router;
