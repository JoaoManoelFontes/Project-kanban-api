import express from "express"
import { userRouter } from "./http/routers/userRouter"
import { taskRouter } from "./http/routers/taskRouter"
import { authMiddleware } from "./http/middlewares/auth"

const app = express()
app.use(express.json())

app.use("/task", authMiddleware, taskRouter)
app.use("/user", userRouter)

app.listen(process.env.PORT, () => console.log("Server is running!"))
