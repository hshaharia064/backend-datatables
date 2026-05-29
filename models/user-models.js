import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

export const User = mongoose.model("User", userSchema);
