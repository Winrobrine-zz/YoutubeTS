import passport from "passport";
import passportGithub from "passport-github";
import passportGoogle from "passport-google-oauth20";

import { User } from "../models/User";
import { Request, Response, NextFunction } from "express";
import routes from "../routes";

const GithubStrategy = passportGithub.Strategy;
const GoogleStrategy = passportGoogle.Strategy;

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

                    req.user.githubId = profile.id;
                    req.user.avatarUrl =
                        req.user.avatarUrl || profile.photos[0].value;
                    await req.user.save();

                    console.log("Github account has been linked.");
                    done(null, req.user);
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
                        username: profile.displayName,
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

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: routes.auth + routes.googleCallback,
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            if (req.user) {
                try {
                    const userExist = await User.exists({
                        googleId: profile.id
                    });
                    if (userExist) {
                        console.log(
                            "There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account."
                        );
                        return done();
                    }

                    req.user.googleId = profile.id;
                    req.user.avatarUrl =
                        req.user.avatarUrl || profile.photos[0].value;
                    await req.user.save();

                    console.log("Google account has been linked.");
                    done(null, req.user);
                } catch (err) {
                    done(err);
                }
            } else {
                try {
                    const existingUser = await User.findOne({
                        googleId: profile.id
                    });
                    if (existingUser) {
                        return done(null, existingUser);
                    }

                    const emailExist = await User.exists({
                        email: profile.emails[0].value
                    });
                    if (emailExist) {
                        console.log(
                            "There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings."
                        );
                        return done();
                    }

                    const user = await new User({
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        avatarUrl: profile.photos[0].value,
                        googleId: profile.id
                    }).save();
                    done(null, user);
                } catch (err) {
                    done(err);
                }
            }
        }
    )
);
