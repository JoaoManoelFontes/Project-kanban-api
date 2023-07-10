import { app } from "../../../server"
import { describe, expect, it } from "vitest"
import request from "supertest"
import { authenticateUser } from "../utils/authenticateUser"

describe("update User (e2e)", () => {
    it("should be able to update a user", async () => {
        const { token } = await authenticateUser()

        const response = await request(app)
            .put(`/user/`)
            .send({
                name: "new name",
            })
            .set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body.name).toEqual("new name")
    })

    it("should not be able to update a user with an invalid body", async () => {
        const { token } = await authenticateUser()

        const response = await request(app)
            .put(`/user/`)
            .send({
                password: "password",
            })
            .set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(500)
        expect(response.body.error).toEqual("Password must be different")
    })
})
