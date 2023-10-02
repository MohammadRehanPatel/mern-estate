import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRouter from "./routes/user.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use("/api/user", userRouter);

app.listen(3001, () => {
  console.log("Server on port 3001!!");
});
