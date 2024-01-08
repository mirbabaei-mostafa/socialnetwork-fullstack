import { NextFunction, Request, Response } from "express";
import { Result, ValidationError, validationResult } from "express-validator";

export const registerUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Controller in");
  const validateRes: Result<ValidationError> = validationResult(req);
  if (!validateRes.isEmpty()) {
    return res.status(501).json(validateRes.array());
  } else {
    res.status(201).json({ message: "Success" });
  }
};
