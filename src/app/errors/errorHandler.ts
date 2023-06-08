import { NextFunction, Request, Response } from "express"
import { ZodError } from "zod"

export const errorHandler = (
    err: Error | ZodError | any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log("The error handler have been called")

    if (err instanceof Error) {
        return res.status(400).json({ message: err.message })
    }

    if (err instanceof ZodError) {
        return res
            .status(400)
            .json({ message: err.flatten().fieldErrors, okok: "okok" })
    }

    return res.status(500).json({ message: "Internal server error" })
}
