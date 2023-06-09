import { UserRepository } from "../../repositories/userRepository"
import { UpdateUser, UpdateUserSchema } from "../../types/userTypes"
import bcrypt from "bcrypt"

interface updateUserResponse {
    repository: UserRepository
    user: UpdateUser
    id: string
}

export async function updateUser({
    repository,
    user,
    id,
}: updateUserResponse): Promise<UpdateUser> {
    const userExists = await repository.findById(id)

    if (userExists instanceof Error) {
        throw new Error("User not found")
    } else {
        if (user.password) {
            if (await bcrypt.compare(user.password, userExists.password)) {
                throw new Error("Password must be different")
            }
            user.password = bcrypt.hashSync(user.password, 10)
        }

        await repository.update(id, user)
        return await repository.findById(id)
    }
}
