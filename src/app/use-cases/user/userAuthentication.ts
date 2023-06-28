import { Login } from "../../types/loginTypes"
import { UserRepository } from "../../repositories/userRepository"
import { User } from "../../types/userTypes"
import { sign } from "jsonwebtoken"
import bcrypt from "bcrypt"

interface userAuthenticationRequest {
    userRepository: UserRepository
    user: Login
}

interface userAuthenticationResponse {
    user: User
    token: string
}

export async function userAuthentication({
    userRepository,
    user,
}: userAuthenticationRequest): Promise<userAuthenticationResponse> {
    const userExists = await userRepository.findByEmail(user.email)

    if (userExists) {
        const passwordMatch = await bcrypt.compare(
            user.password,
            userExists.password
        )

        if (passwordMatch) {
            const token = sign(
                { id: userExists.id },
                process.env.JWT_SECRET_KEY as string,
                {
                    expiresIn: "1d",
                }
            )

            return { user: userExists, token }
        } else {
            throw new Error("Password doesn't match")
        }
    } else {
        throw new Error("User not found")
    }
}
