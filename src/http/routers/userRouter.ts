import express from "express"
import {
    create,
    exclude,
    auth,
    update,
    detail,
} from "../controllers/userController"
import { authMiddleware } from "../middlewares/auth"
import { z } from "zod"

const userRouter = express.Router()

userRouter.post("/", create)
userRouter.post("/auth", auth)
userRouter.delete("/", authMiddleware, exclude)
userRouter.put("/", authMiddleware, update)
userRouter.get("/", authMiddleware, detail)

export { userRouter }
