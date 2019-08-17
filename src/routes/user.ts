import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
    res.send("user index");
});

router.get("/edit", (req: Request, res: Response) => {
    res.send("user edit");
});

router.get("/password", (req: Request, res: Response) => {
    res.send("user password");
});

export default router;
