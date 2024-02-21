import postModel from '../models/postModel';
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
    console.log(req.body);
    // Create new post
    const newPost = new postModel({
      user: req.body.userId,
      type: null,
      text: req.body.text,
      images: req.body.images,
      background: req.body.background,
    });
    await newPost.save();
    return res.status(200).json(newPost);
  } catch (err: any) {
    return res.status(500).json({ message: err.message });
  }
};
