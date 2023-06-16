import mongoose from "mongoose";

import { PostModel, UserModel } from "../model/index.js";

import data from "../data/seed_data.json" assert {type:"json"}; 

const authors = data.blogPosts.map((article) => article.author); 
console.log(authors);

