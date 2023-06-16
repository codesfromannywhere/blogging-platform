import mongoose, { Schema, SchemaTypes, model } from "mongoose";

import { Post } from "./Post.js"

const userSchema = new Schema({
    name: { type: String, require: true },
    email: { type: String, required: true, unique, lowercase: true },
    salt: { type: String, required: true },
    hash: { type: String, required: true },
    posts: [{ type: SchemaTypes.ObjectId, ref: "Post" }],
});

// Hier nur function() - nie Arrow function - nutzen
userSchema.methods.setPassword = function (password) {

    // Salt erstellen
    // this = der User den wir gerade erstellen
    this.salt = crypto.randomBytes(64).toString("hex");

    //Password mit salt hashen
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

userSchema.methods.verifyPassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");

    return this.hash === hash;
}
}

export const UserModel = model("User", userSchema);