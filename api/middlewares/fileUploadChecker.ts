import { NextFunction, Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import FileSystem from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// to remove file from temp storage
// when file type or file size is not verified
const removeTempFile = (filePath: string) => {
  if (!filePath) {
    FileSystem.unlink(filePath, (err) => {
      if (err) {
        throw err;
      }
    });
  }
};

const FileUploadChecker = async (
  // because we want to extend req
  // req: Request & userRequest,
  req: Request,
  // req: Request,
  res: Response,
  next: NextFunction
) => {
  const uploaderFiles: UploadedFile[] = req.body.files;
  if (!uploaderFiles || Object.values(uploaderFiles).flat().length === 0) {
    // if (!req.body.file || Object.values(req.body.file).flat().length === 0) {
    // return res.status(400).json({ message: 'NoFileHasBeenSelected' });
    return res.status(400);
  }

  const fileTypes: string[] = ['jpeg', 'png', 'git', 'webp'];
  let files: UploadedFile[] = Object.values(uploaderFiles).flat();
  // let files: UploadedFile[] = Object.values(req.body.file).flat();

  try {
    files.forEach((file) => {
      // Checking file's format
      if (!fileTypes.includes((file.mimetype as string).split('/')[1])) {
        removeTempFile(file.tempFilePath);
        throw new Error('UnsupportedFormat');
        // return res.status(400).json({ message: 'UnsupportedFormat' });
      }

      // Checking file's size
      if (
        file.size >
        parseInt(process.env.MAX_FILE_SIZE as string) * 1024 * 1024
      ) {
        removeTempFile(file.tempFilePath);
        throw new Error('FileSizeIsTooLarge');
        // return res.status(400).json({ message: 'FileSizeIsTooLarge' });
      }
      next();
    });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({ message: err.message });
  }
};

export default FileUploadChecker;
