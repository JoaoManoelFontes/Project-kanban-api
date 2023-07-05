import { app } from "../../../server"
import { describe, expect, it, beforeAll, afterAll } from "vitest"
import { PrismaClient } from "@prisma/client"
import request from "supertest"
import { createUserFactory } from "../../../app/factories/createUserFactory"

const prisma = new PrismaClient()

beforeAll(async () => {})

afterAll(async () => {
    await prisma.$disconnect()
})

describe("authenticate User (e2e)", () => {
    it("should be able to authenticate a user", async () => {
        const user = await prisma.user.create({
            data: createUserFactory({
                email: "new@mail.com",
                password: "password",
            }),
        })

        const response = await request(app).post("/user/auth").send({
            email: user.email,
            password: "password",
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
        expect(response.body.user).toMatchObject(user)
    })
})
