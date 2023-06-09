import { Login, LoginSchema } from "../../types/loginTypes"
import { UserRepository } from "../../repositories/userRepository"
import { User } from "../../types/userTypes"
import { sign } from "jsonwebtoken"
import bcrypt from "bcrypt"

interface authRequest {
    userRepository: UserRepository
    user: Login
}

interface authResponse {
    user: User
    token: string
}

export async function userAuthentication({
    userRepository,
    user,
}: authRequest): Promise<authResponse> {
    const userExists = await userRepository.findByEmail(user.email)

    if (userExists) {
        const passwordMatch = await bcrypt.compare(
            user.password,
            userExists.password
        )

        if (passwordMatch) {
            const token = sign({ id: userExists.id }, "secret", {
                expiresIn: "1d",
            })

            return { user: userExists, token }
        } else {
            throw new Error("Password doesn't match")
        }
    } else {
        throw new Error("User not found")
    }
}
