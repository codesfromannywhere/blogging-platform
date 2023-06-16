import dotenv from "dotenv";
import mongoose from "mongoose";
export default mongoose;

export { UserModel } from "./User.js";
export { PostModel } from "./Post.js";

dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

console.log("Index js läuft");

mongoose.connect(process.env.DB);

// index. js einmal manuell ausführen, damit in MONGODB eine neue DB angelegt wird!!