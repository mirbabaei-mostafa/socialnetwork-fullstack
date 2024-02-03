import express, { Router } from 'express';
import { verifyUser } from '../db/controllers/userController';
import JWTVerification from '../middlewares/jwt';

const activateRouter: Router = express.Router();
activateRouter.use(JWTVerification);
activateRouter.post('/', verifyUser);

export default activateRouter;
