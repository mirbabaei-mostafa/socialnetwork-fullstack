import { NextFunction, Request, Response } from 'express';
import userModel, { UserSchema } from '../models/userModel';
import {
  Result,
  ValidationError,
  cookie,
  validationResult,
} from 'express-validator';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import sendVerification from '../../utils/mailer';

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
    return res.status(400).json({ error: validateRes.array() });
  } else {
    try {
      // Save new user
      // In userModel passwrd will be encrypted and username will be created
      const newUser = await new userModel({
        ...req.body,
        username: (req.body.fname + req.body.lname).toString().toLowerCase(),
      });
      await newUser.save();

      // Send verification email
      const mailToken = jwt.sign(
        { id: newUser.id.toString() },
        process.env.JWT_TOKEN as string,
        { expiresIn: '30m' }
      );
      const url: string = process.env.BASEURL + '/activate/' + mailToken;
      sendVerification(newUser.email, newUser.username, url);

      // Successfull create new user
      return res.status(201).json({ message: 'SuccessRegisterUser' });
    } catch (err) {
      // Registring new user faced an error and return Error
      // res.status(500).json({ error: validateRes.array() });
      return next(err);
    }
  }
};

// Verify user after registration with email verification
export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.body;

  // To control if the token exist
  if (!token) return res.status(401).json({ message: 'TokenNotValidated' });

  try {
    // Compare recieved token with secret key
    const userId = jwt.verify(token, process.env.JWT_TOKEN as string);
    if (!userId)
      return res.status(401).json({ message: 'TokenNotVerifiedOrExpired' });

    const foundUser = await userModel.findById((userId as any).id);
    if (!foundUser)
      return res.status(401).json({ message: 'TokenNotAssignToUser' });

    // to prevent access when user try to access with another access token
    if (foundUser.id !== req.userId)
      return res.status(403).json({ message: 'TokenNotValidated' });

    if (foundUser!.verify) {
      return res.status(200).json({ message: 'UserWasAlreadyVerified' });
    } else {
      // foundUser!.verify = true;
      // await foundUser?.save();
      await userModel.findByIdAndUpdate((userId as any).id, { verify: true });
      return res.status(200).json({ message: 'UserActivated' });
    }
  } catch (err) {
    return res.status(401).json({ message: err });
  }
};

// Resend verification E-Mail
export const resendVerification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('Resend Verification -------------------->');
  console.log(req.userId);
  if (req.userId) {
    try {
      console.log(req.userId);
      const foundUser = await userModel.findById(req.userId);
      if (!foundUser) {
        console.log('not found user');
        return res.status(401).json({ message: 'UserNotFound' });
      }

      if (foundUser.verify === true) {
        console.log('verified');
        return res.status(400).json({ message: 'UserVerified' });
      }

      // Send verification email
      const mailToken = jwt.sign(
        { id: foundUser.id.toString() },
        process.env.JWT_TOKEN as string,
        { expiresIn: '30m' }
      );
      const url: string = process.env.BASEURL + '/activate/' + mailToken;
      sendVerification(foundUser.email, foundUser.username, url);

      // Successfull create new user
      return res.status(201).json({ message: 'VerificationEmailsended' });
    } catch (err) {
      return next(err);
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
      const foundUser = await userModel.findOne<UserSchema | undefined>({
        email: req.body.email,
      });
      // Email address dose not exit
      if (!foundUser) {
        return res.status(401).json({ error: 'EmailDoseNotExist' });
      }
      // Password entered wrong
      const compareRes = await foundUser.comparePassword(req.body.password);
      if (!compareRes) {
        return res.status(401).json({ error: 'PasswordIsWrong' });
      }

      // Create access and refresh tokens
      const [accessToken, refreshToken] = tokenCreator(foundUser._id);

      // To control, when a token expired then remove from token array
      // Notice: refresh token is array becouse to cover all devices at the same time
      let refreshTokenArray: string[] = req.cookies?.auth_token
        ? foundUser.refresh_token.filter(
            (t: string) => t !== req.cookies.auth_token
          )
        : foundUser.refresh_token;

      // find user from it's refresh token when it exist
      if (req.cookies?.auth_token) {
        const foundToken = await userModel.findOne({
          refreshToken: req.cookies.auth_token,
        });
        if (!foundToken) refreshTokenArray = [];

        res.clearCookie('auth_token', {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
        });
      }

      // adding new refresh token to refresh token array and save to DB
      foundUser.refresh_token = [...refreshTokenArray, refreshToken];
      await foundUser.save();

      // send new refresh token as cookie to client
      res.cookie('auth_token', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge:
          parseInt(process.env.COOKIE_CLIENT_MAXAGE as string) *
          1000 *
          60 *
          60 *
          24,
      });
      // send authenticated user information to client
      res.json({
        accessToken: accessToken,
        fname: foundUser.fname,
        lname: foundUser.lname,
        email: foundUser.email,
        username: foundUser.username,
        image: foundUser.image,
        avatar: foundUser.avatar,
        cover: foundUser.cover,
        verify: foundUser.verify,
      });
    } catch (err) {
      next(err);
    }
  }
};

export const signOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.auth_token) return res.sendStatus(204);
  const oldToken: any = req.cookies?.auth_token;

  const foundUser: UserSchema | null = await userModel.findOne({
    refresh_token: oldToken,
  });

  // Remove current access cookie
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  if (!foundUser) {
    return res.sendStatus(204);
  }

  // Remove old refresh token from refresh token array
  foundUser.refresh_token = foundUser.refresh_token.filter(
    (rToken) => rToken !== oldToken
  );
  // await foundUser.updateOne();
  await foundUser.save();
  return res.sendStatus(204);
};

// Renew user refresh token
// Token with evry Request send to server
// cookieParser get the cookie and store it in
export const renewToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.cookies?.auth_token) return res.sendStatus(401);
  const oldToken: any = req.cookies?.auth_token;

  // Remove current access cookie
  res.clearCookie('auth_token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  try {
    const foundUser: UserSchema | null = await userModel.findOne({
      refresh_token: oldToken,
    });

    jwt.verify(
      oldToken,
      process.env.JWT_REFRESH_TOKEN as string,
      async (err: any, decoded: any) => {
        // If refresh token exist but user dose not exist
        // maybe app/website hacked then have to remove refresh token
        if (!foundUser) {
          if (err) return;

          const hackedUser: any = await userModel.findOne({
            _id: (decoded as any).id,
          });
          if (hackedUser) {
            hackedUser.refresh_token = [];
            await hackedUser.updateOne();
          }
          // return res.sendStatus(403).json({ message: 'Forbiden' });
          return res.sendStatus(403);
        }

        // Remove old refresh token from refresh token array
        const newRefreshTokenArr = foundUser.refresh_token.filter(
          (rToken) => rToken !== oldToken
        );

        // When occured an error, means that token is not verfied.
        // save token array and back forbiden error
        if (err) {
          foundUser.refresh_token = [...newRefreshTokenArr];
          await foundUser.save();
          return res.sendStatus(403);
        }

        // When occured an error and found user ist diffrent with
        if (foundUser._id.toString() !== decoded.id.toString()) {
          return res.sendStatus(403);
        }

        // Create new access and refresh tokens
        const [accessToken, refreshToken] = tokenCreator(foundUser._id);
        foundUser.refresh_token = [...newRefreshTokenArr, refreshToken];
        // await foundUser.updateOne();
        await foundUser.save();

        // send new refresh token as cookie to client
        res.cookie('auth_token', refreshToken, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge:
            parseInt(process.env.COOKIE_CLIENT_MAXAGE as string) *
            1000 *
            60 *
            60 *
            24,
        });

        // // send to client
        // res.json({
        //   accessToken: accessToken,
        // });

        // send user access token and information to client
        return res.json({
          accessToken: accessToken,
          fname: foundUser.fname,
          lname: foundUser.lname,
          email: foundUser.email,
          username: foundUser.username,
          image: foundUser.image,
          avatar: foundUser.avatar,
          cover: foundUser.cover,
          verify: foundUser.verify,
        });
      }
    );
  } catch (err) {
    return err;
  }
};

// Create refresh and access token
const tokenCreator = (id: string): string[] => {
  // Create new access and refresh tokens
  const accessToken: string = jwt.sign(
    { id },
    process.env.JWT_ACCESS_TOKEN as string,
    { expiresIn: process.env.JWT_ACCESSTOKEN_EXPIRE_LONG as string }
  );
  const refreshToken: string = jwt.sign(
    { id },
    process.env.JWT_REFRESH_TOKEN as string,
    { expiresIn: process.env.JWT_REFRESHTOKEN_EXPIRE_LONG as string }
  );
  return [accessToken, refreshToken];
};

export const findAccountByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateRes: Result<ValidationError> = validationResult(req);
  if (!validateRes.isEmpty()) {
    // Request in snot valid
    return res.status(400).json({ error: validateRes.array() });
  } else {
    try {
      // Find when the email address exist
      const foundUser = await userModel.findOne<UserSchema | undefined>({
        email: req.body.email,
      });
      // Email address dose not exit
      if (!foundUser) {
        return res.status(401).json({ error: 'EmailDoseNotExist' });
      }
      // send authenticated user information to client
      return res.json({
        email: foundUser.email,
        image: foundUser.image,
      });
    } catch (err) {
      next(err);
    }
  }
};
