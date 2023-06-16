import mongoose, { Schema, SchemaTypes, model } from "mongoose";

import { Post } from "./Post.js"

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, unique, lowercase:true },
    posts: [{ type: SchemaTypes.ObjectId, ref: "Post" }],
});

export const UserModel = model("User", userSchema);