import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Conneted to MongoDB");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnectrd!");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected!");
});

app.listen(8800, () => {
  connect();
  console.log("Hello, NodeJS!");
});
