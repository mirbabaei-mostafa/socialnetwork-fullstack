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
  if (!req.files || Object.values(req.files).flat().length === 0) {
    return res.status(400).json({ message: 'NoFileHasBeenSelected' });
  }

  const fileTypes: string[] = ['jpeg', 'png', 'git', 'webp'];
  let files: UploadedFile[] = Object.values(req.files).flat();

  try {
    files.forEach((file) => {
      // Checking file's format
      if (!fileTypes.includes(file.mimetype.split('/')[1])) {
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
    return res.status(500).json({ message: err.message });
  }
};

export default FileUploadChecker;
