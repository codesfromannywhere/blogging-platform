import mongoose, { Schema, model } from "mongoose";
// import { User } from "./User.js"

const postSchema = new Schema({
    title: String,
    content: String,
    author: String,
    tags: [{ type: SchemaTypes.ObjectId, ref: Post }],
});

export const PostModel = model("Post", postSchema)