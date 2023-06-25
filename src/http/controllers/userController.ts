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
        const { createdUser } = await createUser({
            userRepository: repository,
            user: params,
        })
        res.status(201).send(createdUser)
    } catch (err) {
        next(err)
    }
}

export async function auth(req: Request, res: Response, next: NextFunction) {
    try {
        const params = LoginSchema.parse(req.body)
        const { user, token } = await userAuthentication({
            userRepository: repository,
            user: params,
        })
        res.send({
            user,
            token,
        })
    } catch (err) {
        next(err)
    }
}

export async function exclude(req: Request, res: Response, next: NextFunction) {
    try {
        await deleteUser({
            userRepository: repository,
            id: req.sub,
        })
        res.status(204).send({ message: "User deleted" })
    } catch (err) {
        next(err)
    }
}

export async function update(req: Request, res: Response, next: NextFunction) {
    try {
        const params = UpdateUserSchema.parse(req.body)
        const { updatedUser } = await updateUser({
            repository,
            user: params,
            id: req.sub,
        })
        res.status(200).send(updatedUser)
    } catch (err) {
        next(err)
    }
}

export async function detail(req: Request, res: Response, next: NextFunction) {
    try {
        const { user } = await findUser({
            userRepository: repository,
            id: req.sub,
        })

        return res.status(200).send(user)
    } catch (err) {
        next(err)
    }
}
