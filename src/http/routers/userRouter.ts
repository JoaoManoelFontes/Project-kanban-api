import express from "express";
import { create } from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/", create);

export { userRouter };
