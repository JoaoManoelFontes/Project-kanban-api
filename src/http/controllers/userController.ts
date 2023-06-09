import { NextFunction, Request, Response } from "express"
import { PrismaUserRepository } from "../../database/prisma/prismaUserRepository"
import { createUser } from "../../app/use-cases/user/createUser"
import { userAuthentication } from "../../app/use-cases/user/userAuthentication"
import { deleteUser } from "../../app/use-cases/user/deleteUser"
import { updateUser } from "../../app/use-cases/user/updateUser"
import { findUser } from "../../app/use-cases/user/findUser"
import { LoginSchema } from "../../app/types/loginTypes"
import { UserSchema, UpdateUserSchema } from "../../app/types/userTypes"

const repository = new PrismaUserRepository()

export async function create(req: Request, res: Response, next: NextFunction) {
    try {
        const params = UserSchema.parse(req.body)
        const user = await createUser({
            userRepository: repository,
            user: params,
        })
        res.status(201).send(user)
    } catch (err) {
        next(err)
    }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const params = LoginSchema.parse(req.body)
        const auth = await userAuthentication({
            userRepository: repository,
            user: params,
        })
        res.send(auth)
    } catch (err) {
        next(err)
    }
}

export async function exclude(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteUser(repository, req.sub)
        res.status(204).send({ message: "User deleted" })
    } catch (err) {
        next(err)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const params = UpdateUserSchema.parse(req.body)
        const user = await updateUser({
            repository,
            user: params,
            id: req.sub,
        })
        res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}

export async function detail(req: Request, res: Response) {
    const user = await findUser(repository, req.sub)

    if (user instanceof Error) {
        return res.status(404).json({ error: user.message })
    }

    return res.status(200).json(user)
}
