import { app } from "../../../server"
import { describe, expect, it } from "vitest"
import request from "supertest"
import { createUser } from "../utils/createUser"

describe("authenticate User (e2e)", () => {
    it("should be able to authenticate a user", async () => {
        const user = await createUser()

        const response = await request(app).post("/user/auth").send({
            email: user.email,
            password: "password",
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("token")
        expect(response.body.user).toMatchObject(user)
    })

    it("should not be able to authenticate a user with an invalid body", async () => {
        const response = await request(app).post("/user/auth").send({
            email: "invalid",
            password: "invalid",
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toEqual("Validation error.")
    })
})
