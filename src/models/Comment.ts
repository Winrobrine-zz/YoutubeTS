import mongoose from "mongoose";
import { UserDocument } from "./User";

export type CommentDocument = mongoose.Document & {
    text: string;
    createdAt: Date;
    creator: UserDocument | string;
};

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

export const Comment = mongoose.model<CommentDocument>(
    "Comment",
    commentSchema
);
