import mongoose, { Schema, SchemaTypes, model } from "mongoose";

import { Post } from "./Post.js"

const userSchema = new Schema({
    name: String,
    email: String,
    posts: [{ type: SchemaTypes.ObjectId, ref: Post }],
});

export const UserModel = model("User", userSchema);