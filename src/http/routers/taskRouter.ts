import express from "express"
import { create, findAllByUserId } from "../controllers/taskController"
import { authMiddleware } from "../middlewares/auth"

const taskRouter = express.Router()

taskRouter.post("/", authMiddleware, create)
taskRouter.get("/", authMiddleware, findAllByUserId)

export { taskRouter }
