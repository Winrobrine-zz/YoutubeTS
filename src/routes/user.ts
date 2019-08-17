import express from "express";
import routes from "../routes";

import * as userController from "../controllers/user";

const router = express.Router();

router.get(routes.userDetail(), userController.userDetail);

export default router;
