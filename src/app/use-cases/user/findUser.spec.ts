import { expect, test } from "vitest"
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository"
import { findUser } from "./findUser"
import { createUserFactory } from "../../factories/createUserFactory"

test("Should find user", async () => {
    const repository = new InMemoryUserRepository()

    const user = await repository.create(createUserFactory())

    const foundUser = await findUser(repository, user.id)

    expect(foundUser).toEqual(user)
})

test("Should not find user with inexistent id", async () => {
    const repository = new InMemoryUserRepository()

    expect(
        async () => await findUser(repository, "inexistent id")
    ).rejects.toThrowError("User not found")
})
