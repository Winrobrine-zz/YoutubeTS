import express from "express";
import routes from "../routes";

const router = express.Router();

router.get(routes.index, (req, res) => res.send("Home"));
router.get(routes.signup, (req, res) => res.send("Signup"));
router.get(routes.login, (req, res) => res.send("Login"));
router.get(routes.logout, (req, res) => res.send("Logout"));
router.get(routes.search, (req, res) => res.send("Search"));

export default router;
