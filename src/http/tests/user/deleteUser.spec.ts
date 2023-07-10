import { app } from "../../../server"
import { describe, expect, it } from "vitest"
import request from "supertest"
import { authenticateUser } from "../utils/authenticateUser"

describe("delete User (e2e)", () => {
    it("should be able to delete a user", async () => {
        const { token } = await authenticateUser()

        const response = await request(app)
            .delete(`/user/`)
            .set("Authorization", `Bearer ${token}`)

        expect(response.status).toBe(204)
        const user = await request(app)
            .get(`/user/`)
            .set("Authorization", `Bearer ${token}`)

        expect(user.status).toBe(500)
    })
})
