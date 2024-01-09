import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import { Result, ValidationError, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendVerification from "../../utils/mailer";

dotenv.config();

// Register new User
// If request was not valid, will return Error
export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateRes: Result<ValidationError> = validationResult(req);
  if (!validateRes.isEmpty()) {
    // Request in snot valid
    res.status(400).json({ error: validateRes.array() });
  } else {
    try {
      // Save new user
      // In userModel passwrd will be encrypted and username will be created
      const newUser = await new userModel({
        ...req.body,
        username: req.body.fname + req.body.lname,
      });
      await newUser.save();

      // Send verification email
      const mailToken = jwt.sign(
        { id: newUser._id.toString() },
        process.env.JWT_TOKEN as string,
        { expiresIn: "30m" }
      );
      const url: string = process.env.BASEURL + "/activate/" + mailToken;
      sendVerification(newUser.email, newUser.username, url);

      // Successfull create new user
      res.status(201).json({ message: "SuccessRegisterUser" });
    } catch (err) {
      // Registring new user faced an error and return Error
      // res.status(500).json({ error: validateRes.array() });
      next(err);
    }
  }
};
