import mongoose, { PassportLocalSchema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { CommentDocument } from "./Comment";
import { VideoDocument } from "./Video";

export type UserDocument = mongoose.PassportLocalDocument & {
    username: string;
    email: string;
    avatarUrl: string;
    githubId: string;
    googleId: string;
    comments: CommentDocument[] | string[];
    videos: VideoDocument[] | string[];
};

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    avatarUrl: String,
    githubId: String,
    googleId: String,
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    videos: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Video"
        }
    ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

export const User = mongoose.model<UserDocument>(
    "User",
    userSchema as PassportLocalSchema
);
