import { expect, test } from "vitest"
import { createUser } from "./createUser"
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository"
import { createUserFactory } from "../../factories/createUserFactory"

test("createUser", async () => {
    const repository = new InMemoryUserRepository()
    const user = createUserFactory()

    await createUser({ userRepository: repository, user: user })

    expect(repository.users.length).toBe(1)
    expect(repository.users[0].name).toBe(user.name)
})

test("createUser with existent email", async () => {
    const repository = new InMemoryUserRepository()
    const user = createUserFactory()
    await createUser({ userRepository: repository, user: user })

    expect(
        async () => await createUser({ userRepository: repository, user: user })
    ).rejects.toThrowError("User already exists")
})
