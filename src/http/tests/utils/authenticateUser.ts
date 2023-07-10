import { app } from "../../../server"
import request from "supertest"
import { createUser } from "./createUser"
import { User } from "../../../app/types/userTypes"

interface AuthenticateUserResponse {
    token: string
    user: User
}

export async function authenticateUser(): Promise<AuthenticateUserResponse> {
    const user = await createUser()

    const { body } = await request(app).post("/user/auth").send({
        email: user.email,
        password: "password",
    })

    return body
}
