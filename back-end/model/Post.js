import mongoose, { Schema, model } from "mongoose";
// import { User } from "./User.js"

const postSchema = new Schema({
    title: String,
    content: String,
    author: [{ type: SchemaTypes.ObjectId, ref: "User" }],
    tags : String,
});

export const PostModel = model("Post", postSchema)