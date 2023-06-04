import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

type Payload = {
    id: string
    iat: number
    exp: number
}

export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (!req.headers.authorization) {
        return res.status(401).json({ error: "Token not provided" })
    }

    const token = req.headers.authorization.split(" ")[1]
    try {
        const decode = verify(token, process.env.JWT_SECRET_KEY as string)
        const { id } = decode as Payload

        req.sub = id
        return next()
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" })
    }
}
