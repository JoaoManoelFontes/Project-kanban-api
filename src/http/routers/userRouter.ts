import express from "express";
import { create, exclude, login } from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/", create);
userRouter.post("/login", login);
userRouter.delete("/", exclude);

export { userRouter };
