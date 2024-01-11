import { NextFunction, Request, Response } from "express";
import userModel, { UserSchema } from "../models/userModel";
import { Result, ValidationError, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendVerification from "../../utils/mailer";
import Users from "../models/userModel";

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

// User authentication
export const authUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // User entry validation
  const validateRes: Result<ValidationError> = validationResult(req);
  if (!validateRes.isEmpty()) {
    // Request in snot valid
    res.status(400).json({ error: validateRes.array() });
  } else {
    try {
      // Find when the email address exist
      await Users.findOne<UserSchema | undefined>({
        email: req.body.email,
      }).then((u: any) => {
        // Email address dose not exit
        if (!u) {
          return res.status(401).json({ error: "EmailDosentExist" });
        }
        // Password entered wrong
        if (!u.comparePassword(req.body.password)) {
          return res.status(401).json({ error: "PasswordIsWrong" });
        }
        const accessToken = jwt.sign(
          { id: u._id },
          process.env.JWT_ACCESS_TOKEN as string,
          { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRE_LONG as string }
        );
        const refreshToken = jwt.sign(
          { id: u._id },
          process.env.JWT_REFRESH_TOKEN as string,
          { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRE_LONG as string }
        );
      });
    } catch (err) {
      next(err);
    }
  }
};
