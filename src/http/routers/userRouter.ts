import express from "express";
import {
  create,
  exclude,
  login,
  update,
  show,
} from "../controllers/userController";
const userRouter = express.Router();

userRouter.post("/", create);
userRouter.post("/login", login);
userRouter.delete("/:id", exclude);
userRouter.put("/:id", update);
userRouter.get("/:id", show);

export { userRouter };
