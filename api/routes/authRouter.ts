import express, { Router } from "express";
import authValidator from "../validators/authValidator";
import { authUser } from "../db/controllers/userController";

const authRouter: Router = express.Router();
authRouter.post("/", authValidator, authUser);

export default authRouter;
