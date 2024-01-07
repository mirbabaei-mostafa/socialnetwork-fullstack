import express, { Request, Response, Application, NextFunction } from "express";
import registerRouter from "./routes/registerRouter";
import dotenv from "dotenv";
import { connectDB } from "./db/mongodb";
import mongoose from "mongoose";

const app: Application = express();

dotenv.config();
const port: string = process.env.PORT || "8000";

connectDB();

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});

app.use(express.json());

app.use("/api/register", registerRouter);
