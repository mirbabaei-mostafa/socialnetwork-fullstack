import express, { Request, Response, Application, NextFunction } from "express";
import dotenv from "dotenv";
import { connectDB } from "./db/mongodb";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter";
import cookieParser from "cookie-parser";
import { corsOptions, credentialCors } from "./utils/corsconfig";
import cors, { CorsOptions } from "cors";
import fileUpload from "express-fileupload";

const app: Application = express();

dotenv.config();
const port: string = process.env.PORT || "8000";

connectDB();

mongoose.connection.once("open", () => {
  app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
  });
});

app.use(credentialCors);
app.use(cors(corsOptions as CorsOptions));
// app.options("*", cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

// Public routes
// app.use('/user/register', registerRouter);
// app.use('/user/auth', authRouter);
// app.use('/user/renew', renewRouter);

app.use("/user", userRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  const errStatus: number = err.status || 500;
  const errMessage: string = err.message || "InternalServerError";
  return res
    .status(errStatus)
    .send({ success: false, message: errMessage, status: errStatus });
});
