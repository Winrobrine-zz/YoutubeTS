import mongoose from "mongoose";
import { CommentDocument } from "./Comment";
import { UserDocument } from "./User";

export type VideoDocument = mongoose.Document & {
    src: string;
    title: string;
    description: string;
    views: number;
    createdAt: Date;
    comments: CommentDocument[] | string[];
    creator: UserDocument | string;
};

const videoSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    views: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Video = mongoose.model<VideoDocument>("Video", videoSchema);
