import express from "express"
import { create, findAllByUserId, update } from "../controllers/taskController"
import { authMiddleware } from "../middlewares/auth"

const taskRouter = express.Router()

taskRouter.post("/", authMiddleware, create)
taskRouter.get("/", authMiddleware, findAllByUserId)
taskRouter.put("/:id", authMiddleware, update)

export { taskRouter }
