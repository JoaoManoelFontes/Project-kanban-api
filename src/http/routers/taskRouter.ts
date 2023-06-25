import express from "express"
import { create, list, update, detail } from "../controllers/taskController"
import { authMiddleware } from "../middlewares/auth"

const taskRouter = express.Router()

taskRouter.post("/", authMiddleware, create)
taskRouter.get("/", authMiddleware, list)
taskRouter.put("/:id", authMiddleware, update)
taskRouter.get("/:id", authMiddleware, detail)
taskRouter.delete("/:id", authMiddleware)

export { taskRouter }
