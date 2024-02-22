import { NextFunction, Request, Response } from "express";
import userModel, { UserSchema } from "../models/userModel";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { FileArray, UploadedFile } from "express-fileupload";

dotenv.config();

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body.email);
  if (!req.body.email) {
    return res.status(401).json({ message: "EmailDoseNotExist" });
  }

  try {
    // Find when the email address exist
    const foundUser = await userModel.findOne<UserSchema | undefined>({
      email: req.body.email,
    });
    // Email address dose not exit
    if (!foundUser) {
      return res.status(401).json({ error: "EmailDoseNotExist" });
    }

    // Config multer
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, "uploads/" + foundUser._id);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() +
          "-" +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, foundUser._id + "-" + uniqueSuffix);
      },
    });
    const upload = multer({ storage: storage });

    let files: UploadedFile[] = Object.values(req.files as FileArray).flat();
    let images: string[];

    upload.array("photos", parseInt(process.env.MAX_IMAGE as string)),
      function (req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ images: req.files });
      };
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
