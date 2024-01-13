import express, { Router } from 'express';
import { verifyUser } from '../db/controllers/userController';

const activateRouter: Router = express.Router();
activateRouter.post('/', verifyUser);

export default activateRouter;
