import mongoose from "mongoose";

export type CommentDocument = mongoose.Document & {
    text: string;
    createdAt: Date;
};

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Comment = mongoose.model<CommentDocument>(
    "Comment",
    commentSchema
);
