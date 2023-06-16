import express from "express";
import dotenv from "dotenv";
import "./model/index.js"

dotenv.config({ path: new URL("../.env", import.meta.url).pathname });

const PORT = process.env.BE_PORT || 3000;

const app = express();

const ReactAppDistPath = new URL("../front-end/dist/", import.meta.url);
const ReactAppIndex = new URL("../front-end/dist/index.html", import.meta.url);


app.use(express.static(ReactAppDistPath.pathname));


app.get("/api/status", (req, res) => {
  res.send({ status: "Ok" });
});

app.get("/*", (req, res) => {
  res.sendFile(ReactAppIndex.pathname);
});

// NEUE ROUTEN

app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Erstelle einen neuen Benutzer
    const newUser = new UserModel({ name, email });
    newUser.setPassword(password);

    // Speichert User in DB
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Überprüft, ob User existiert
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Überprüft PW
    const isPasswordValid = user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



app.listen(PORT, () => {
  console.log("Server running on Port: ", PORT);
});