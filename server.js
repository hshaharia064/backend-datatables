import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/user-models.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/users_demo")
  .then(() => console.log("Mongoose connected"));

//   Routes
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
});

app.listen(5000, () => {
  console.log("Express is running...");
});
