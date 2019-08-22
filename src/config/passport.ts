import passport from "passport";
import passportGithub from "passport-github";

import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import routes from "../routes";

const GithubStrategy = passportGithub.Strategy;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(
    new GithubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: routes.auth + routes.githubCallback,
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            if (req.user) {
                try {
                    const userExist = await User.exists({
                        githubId: profile.id
                    });
                    if (userExist) {
                        console.log(
                            "There is already a Github account that belongs to you. Sign in with that account or delete it, then link it with your current account."
                        );
                        return done();
                    }

                    const user = await User.findById(req.user.id);
                    user.githubId = profile.id;
                    user.avatarUrl = user.avatarUrl || profile.photos[0].value;
                    await user.save();

                    console.log("Github account has been linked.");
                    done(null, user);
                } catch (err) {
                    done(err);
                }
            } else {
                try {
                    const existingUser = await User.findOne({
                        githubId: profile.id
                    });
                    if (existingUser) {
                        return done(null, existingUser);
                    }

                    const emailExist = await User.exists({
                        email: profile.emails[0].value
                    });
                    if (emailExist) {
                        console.log(
                            "There is already an account using this email address. Sign in to that account and link it with Github manually from Account Settings."
                        );
                        return done();
                    }

                    const user = await new User({
                        username: profile.username,
                        email: profile.emails[0].value,
                        avatarUrl: profile.photos[0].value,
                        githubId: profile.id
                    }).save();
                    done(null, user);
                } catch (err) {
                    done(err);
                }
            }
        }
    )
);

export const isAuthenticated = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect(routes.login);
};
