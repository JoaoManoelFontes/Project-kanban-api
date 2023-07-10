import { app } from "../../../server"
import { describe, expect, it } from "vitest"
import request from "supertest"
import { authenticateUser } from "../utils/authenticateUser"

describe("detail User (e2e)", () => {
    it("should be able to detail a user", async () => {
        const { token, user } = await authenticateUser()

        const response = await request(app)
            .get(`/user/`)
            .set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toEqual(user)
    })

    it("should not be able to detail a user with an invalid token", async () => {
        await authenticateUser()

        const response = await request(app)
            .get(`/user/`)
            .set("Authorization", `Bearer invalid token`)

        expect(response.status).toBe(401)
        expect(response.body.error).toEqual("Invalid token")
    })
})
