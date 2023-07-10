import { PrismaClient } from "@prisma/client"
import { createUserFactory } from "../../../app/factories/createUserFactory"
import { User } from "../../../app/types/userTypes"

export async function createUser(): Promise<User> {
    const prisma = new PrismaClient()

    const userExists = await prisma.user.findFirst({
        where: {
            email: "teste2e@mail.com",
        },
    })

    if (userExists) {
        return userExists
    }

    const user = await prisma.user.create({
        data: createUserFactory({
            email: "teste2e@mail.com",
            password: "password",
        }),
    })

    return user
}
