import { app } from "../../../server"
import { describe, expect, it } from "vitest"
import request from "supertest"

describe("create User (e2e)", () => {
    it("should be able to create a user", async () => {
        const response = await request(app).post("/user").send({
            email: "test@mail.com",
            name: "test",
            password: "password",
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("id")
    })

    it("should not be able to create a user with an existing email", async () => {
        const response = await request(app).post("/user").send({
            email: "test@mail.com",
            name: "test",
            password: "password",
        })

        expect(response.status).toBe(500)
        expect(response.body.error).toEqual("User already exists")
    })

    it("should not be able to create a user with an invalid body", async () => {
        const response = await request(app).post("/user").send({
            email: "invalid",
            name: "",
            password: "",
        })

        expect(response.status).toBe(400)
        expect(response.body.message).toEqual("Validation error.")
    })
})
