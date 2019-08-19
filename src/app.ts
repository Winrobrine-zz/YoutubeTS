import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";
import mongoose from "mongoose";
import path from "path";
import * as secrets from "./utils/secrets";

import routes from "./routes";
import accountRouter from "./routes/account";
import homeRouter from "./routes/index";
import userRouter from "./routes/user";
import videoRouter from "./routes/video";

const app = express();

mongoose
    .connect(secrets.MONGODB_URI, { useNewUrlParser: true })
    .then(() => {})
    .catch(err => {
        console.log(
            `MongoDB connection error. Please make sure MongoDB is running. ${err}`
        );
    });

app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger("dev"));
app.use((req, res, next) => {
    res.locals.user = false;
    res.locals.routes = routes;
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(routes.account, accountRouter);
app.use(routes.index, homeRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
