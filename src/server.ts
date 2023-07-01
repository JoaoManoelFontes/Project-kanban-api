import express, { NextFunction, Request, Response } from "express"
import { userRouter } from "./http/routers/userRouter"
import { taskRouter } from "./http/routers/taskRouter"
import { authMiddleware } from "./http/middlewares/auth"
import { ZodError } from "zod"

export const app = express()
app.use(express.json())

app.use("/task", authMiddleware, taskRouter)
app.use("/user", userRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ZodError) {
        res.status(400).send({
            message: "Validation error.",
            issues: err.format(),
        })
        return
    }

    res.status(500).send({ message: "something broke", error: err.message })
})

app.listen(process.env.PORT, () => console.log("Server is running!"))
