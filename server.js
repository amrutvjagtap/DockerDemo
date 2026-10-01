import express from "express";
import mongoose from "mongoose";
import path from "path"
import { UserModle } from "./model/userSchema.js";

const app = express();



const PORT=process.env.PORT || 4444;

const MONGO_URL=process.env.MONGO_URL || "mongodb://mongo:27017/docker_learning";


mongoose.connect(MONGO_URL)
    .then(()=>{
        console.log("MongoDB Connected");
    })
    .catch((err)=>{
        console.error("MongoDB failed to connect", err);
    })

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
 res.sendFile("/app/index.html")
});

app.get("/api/users", (req, res) => {
  res.json([
    { id: 1, name: "Amrut" },
    { id: 2, name: "Snehal Sagaonkar test" }
  ]);
});


app.get("/api/post", (req, res) => {
  res.json([
    { id: 1, name: "One more important thing: if your Dockerfile has" },
    { id: 2, name: "One more important thing: if your Dockerfile has" }
  ]);
});



// GET API → Insert random user
app.get("/api/add-user", async (req, res) => {
  try {
    const randomUser = {
      name: `User${Math.floor(Math.random() * 1000)}`,
      technology: "Docker",
      age: Math.floor(Math.random() * 20) + 20,
    };

    const user = await UserModle.create(randomUser);

    res.json({
      message: "User inserted successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to insert user",
      error: error.message,
    });
  }
});


// GET API → Get all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserModle.find();

    res.json({
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});