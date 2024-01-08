import express, { Router } from "express";
import registerValidator from "../validators/registerValidator";
import { registerUser } from "../db/controllers/userController";

const registerRouter: Router = express.Router();
registerRouter.post("/", registerValidator, registerUser);

export default registerRouter;
