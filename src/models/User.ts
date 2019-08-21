import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export type UserDocument = mongoose.PassportLocalDocument & {
    username: string;
    email: string;
    avatarUrl: string;
    githubId: string;
    facebookId: string;
};

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    avatarUrl: String,
    githubId: String,
    facebookId: String
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export const User = mongoose.model<UserDocument>(
    "User",
    userSchema as PassportLocalSchema
);
