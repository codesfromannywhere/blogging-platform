import mongoose from "mongoose";

import { PostModel, UserModel } from "../model/index.js";

import data from "../data/seed_data.json" assert {type:"json"}; 

await mongoose.connection.dropDatabase();

const authors = data.blogPosts.map((article) => article.author); 
console.log(authors);

const uniqueAuthors  = [...new Set(authors)]; 

// Promise Array
const userCreations = uniqueAuthors.map((author) => {
    const email = author.split(" ").join("") + "gmail.com";
    return User.create({name: author});
})

await Promise.all (userCreations)