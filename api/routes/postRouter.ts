import express, { Router } from 'express';
import FileUploadChecker from '../middlewares/fileUploadChecker';
import { uploadImages } from '../db/controllers/uploadController';

const postRouter: Router = express.Router();

postRouter.post('/uploadImages', FileUploadChecker, uploadImages);

export default postRouter;
