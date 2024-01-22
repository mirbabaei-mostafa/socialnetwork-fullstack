import express, { Router } from "express";
import { renewToken } from "../db/controllers/userController";

const renewRouter: Router = express.Router();
renewRouter.get("/", renewToken);

export default renewRouter;
