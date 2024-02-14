import express, { Router } from 'express';
import FileUploadChecker from '../middlewares/fileUploadChecker';
import { uploadImages } from '../db/controllers/uploadController';
import { createPost } from '../db/controllers/postController';

const postRouter: Router = express.Router();

postRouter.post('/uploadImages', FileUploadChecker, uploadImages);
postRouter.post('/createPost', createPost);

export default postRouter;
