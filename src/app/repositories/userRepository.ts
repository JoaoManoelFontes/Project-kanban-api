import { User } from "../types/userTypes"

export abstract class UserRepository {
    abstract create(user: User): Promise<User>
    abstract findByEmail(email: string): Promise<User | null>
    abstract findById(id: string): Promise<User>
    abstract delete(id: string): Promise<void>
    abstract update(id: String, user: Partial<User>): Promise<User>
}
