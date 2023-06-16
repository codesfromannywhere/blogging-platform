import mongoose from "mongoose";

import { PostModel, UserModel } from "../model/index.js";

import data from "../data/seed_data.json" assert {type: "json"};

await mongoose.connection.dropDatabase();

// AUTHORS

const authors = data.blogPosts.map((article) => article.author);
console.log(authors);

const uniqueAuthors = [...new Set(authors)];

// Promise Array
const userCreations = uniqueAuthors.map((author) => {
    const email = author.split(" ").join("") + "gmail.com";
    const password = email;
    return User.create({ name: author });
})

await Promise.all(userCreations)




// BLOGPOSTS

for (let postData of data.blogPosts) {
    console.log(post);

    // Neuen Post erstellen
    let post = new PostModel({ title: postData.title, content: postData.content });
    // Finde den Author
    const author = await UserModel.findOne({ name: postData.author });
    // Weise dem Author den Post zu
    post.author = author;
    // Speichere den Post -> Upload nach DB
    await post.save();
    //Füge den post der User.posts property hinzu
    author.posts.push(post);
    // Speichere die Änderung am Author -> Upload nach DB

    let savedAuthor = await author.save();
    console.log(savedAuthor);
    // await author.save();
};


UserModel.find().populate("posts");
console.log(JSON.stringify(UserModel, null, 4));


const noah = await User.findOne({email:"noah.miller@gmail.com"});
const loginPassword = "noah.miller@gmail.com";

const isPwValid = noah.verifyPassword(loginPassword);

console.log(loginPassword, isPwValid);