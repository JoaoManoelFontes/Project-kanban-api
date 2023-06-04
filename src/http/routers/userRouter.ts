import express from "express";
import {
  create,
  exclude,
  login,
  update,
  detail,
} from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/", create);
userRouter.post("/login", login);
userRouter.delete("/", authMiddleware,  exclude);
userRouter.put("/", authMiddleware, update);
userRouter.get("/", authMiddleware, detail);

export { userRouter };
