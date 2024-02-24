import postModel from '../models/postModel';
import userModel, { UserSchema } from '../models/userModel';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const createPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Post');
  if (!req.body.text && !req.body.images && !req.body.background) {
    console.log('PostCouldNotBeEmpty');
    return res.status(401).json({ message: 'PostCouldNotBeEmpty' });
  }
  try {
    if (!req.cookies?.auth_token) return res.sendStatus(401);
    const authToken: any = req.cookies?.auth_token;

    // find user's data by refresh token
    const foundUser = await userModel.findOne<UserSchema | undefined>({
      refresh_token: authToken,
    });
    // User dose not exit
    if (!foundUser) {
      return res.status(401).json({ error: 'UserDoseNotExist' });
    }

    console.log(req.body);
    // Create new post
    const newPost = new postModel({
      user: foundUser._id,
      type: null,
      text: req.body.text,
      images: req.body.images,
      background: req.body.background,
    });
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};
