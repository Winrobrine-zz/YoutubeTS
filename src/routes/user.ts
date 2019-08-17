import express from "express";
import routes from "../routes";

const router = express.Router();

router.get(routes.index, (req, res) => res.send("Users"));
router.get(routes.editProfile, (req, res) => res.send("Edit Profile"));
router.get(routes.password, (req, res) => res.send("Change Password"));
router.get(routes.userDetail, (req, res) => res.send("User Detail"));

export default router;
