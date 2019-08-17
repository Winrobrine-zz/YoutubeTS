import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";
import "./utils/logger";

import homeRouter from "./routes/index";
import userRouter from "./routes/user";
import videoRouter from "./routes/video";

const app = express();

app.set("port", process.env.PORT || 3000);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use("/", homeRouter);
app.use("/user", userRouter);
app.use("/video", videoRouter);

export default app;
