import express from "express";
import { create, findAllByUserId } from "../controllers/taskController";
const taskRouter = express.Router();

taskRouter.post("/", create);
taskRouter.get("/:userId", findAllByUserId);

export { taskRouter };
