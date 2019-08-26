import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "morgan";
import mongo from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import path from "path";
import session from "express-session";
import * as secrets from "./utils/secrets";

import routes from "./routes";
import accountRouter from "./routes/account";
import apiRouter from "./routes/api";
import authRouter from "./routes/auth";
import homeRouter from "./routes/index";
import userRouter from "./routes/user";
import videoRouter from "./routes/video";

const MongoStore = mongo(session);

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
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: secrets.SESSION_SECRET,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    res.locals.user = req.user;
    res.locals.routes = routes;
    next();
});

app.use(express.static(path.join(__dirname, "public")));

app.use(routes.account, accountRouter);
app.use(routes.api, apiRouter);
app.use(routes.auth, authRouter);
app.use(routes.index, homeRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;
