import express from "express";
import { create } from "../controllers/taskController";
const taskRouter = express.Router();

taskRouter.post("/", create);

export { taskRouter };
