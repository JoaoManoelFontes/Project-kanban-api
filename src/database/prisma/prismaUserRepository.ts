import { PrismaClient } from "@prisma/client"
import { UserRepository } from "../../app/repositories/userRepository"
import { User } from "../../app/types/userTypes"

const prisma = new PrismaClient()
export class PrismaUserRepository extends UserRepository {
    async create(user: User): Promise<User> {
        return await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
            },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        })

        if (!user) return null

        return user
    }

    async delete(id: string): Promise<void> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        })

        if (user) {
            await prisma.user.delete({
                where: {
                    id,
                },
            })
        } else {
            throw new Error("User not found")
        }
    }

    async update(id: string, user: Partial<User>): Promise<User> {
        const userExists = await prisma.user.findUnique({
            where: { id },
        })

        if (!userExists) throw new Error("User not found")

        const updatedUser = await prisma.user.update({
            where: userExists,
            data: user,
        })

        return updatedUser
    }

    async findById(id: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {
                id,
            },
        })
        if (!user) throw new Error("User not found")
        return user
    }
}
