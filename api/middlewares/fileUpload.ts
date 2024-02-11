import { NextFunction, Request, Response } from "express";

const FileUpload = async (
  // because we want to extend req
  // req: Request & userRequest,
  req: Request,
  // req: Request,
  res: Response,
  next: NextFunction
) => {};

export default FileUpload;
