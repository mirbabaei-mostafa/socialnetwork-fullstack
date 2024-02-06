import express, { Router } from 'express';
import authValidator from '../validators/authValidator';
import registerValidator from '../validators/registerValidator';
import findUserValidator from '../validators/findUserValidator';
import {
  authUser,
  findAccountByEmail,
  registerUser,
  renewToken,
  resendVerification,
  verifyUser,
} from '../db/controllers/userController';
import JWTVerification from '../middlewares/jwt';

const userRouter: Router = express.Router();

// Public routes
userRouter.post('/register', registerValidator, registerUser);
userRouter.post('/auth', authValidator, authUser);
userRouter.get('/renew', renewToken);
userRouter.post('/finduser', findUserValidator, findAccountByEmail);

// Peotected routes
userRouter.use(JWTVerification);
userRouter.post('/activate', verifyUser);
userRouter.post('/resendverification', resendVerification);

export default userRouter;
