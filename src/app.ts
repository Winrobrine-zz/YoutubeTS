import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";
import "./utils/logger";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello, world!");
});

export default app;
