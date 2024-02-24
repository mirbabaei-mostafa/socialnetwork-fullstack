import { NextFunction, Request, Response } from 'express';
import userModel, { UserSchema } from '../models/userModel';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { FileArray, UploadedFile } from 'express-fileupload';

dotenv.config();

export const uploadImages = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.body.files) {
    res.status(404);
  }
  const uploaderFiles = req.body.files;

  if (!req.cookies?.auth_token) return res.sendStatus(401);
  const authToken: any = req.cookies?.auth_token;
  // if (!req.body.email) {
  //   return res.status(401).json({ message: 'EmailDoseNotExist' });
  // }

  try {
    // find user's data by refresh token
    const foundUser = await userModel.findOne<UserSchema | undefined>({
      refresh_token: authToken,
    });
    // User dose not exit
    if (!foundUser) {
      return res.status(401).json({ error: 'UserDoseNotExist' });
    }

    // Config multer
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/' + foundUser._id);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9) +
          path.extname(file.originalname);
        // cb(null, file.fieldname + '-' + uniqueSuffix)
        cb(null, foundUser._id + '-' + uniqueSuffix);
      },
    });
    const upload = multer({ storage: storage });

    let files: UploadedFile[] = Object.values(
      uploaderFiles as FileArray
    ).flat();
    let images: string[];

    upload.array('photos', parseInt(process.env.MAX_IMAGE as string)),
      function (req: Request, res: Response, next: NextFunction) {
        res.status(200).json({ images: uploaderFiles });
      };
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
