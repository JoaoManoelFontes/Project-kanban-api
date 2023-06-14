import { expect, test } from "vitest"
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository"
import { deleteUser } from "./deleteUser"
import { createUserFactory } from "../../factories/createUserFactory"

test("deleteUser", async () => {
    const repository = new InMemoryUserRepository()

    const { id, email } = await repository.create(createUserFactory())

    await deleteUser(repository, id)

    const user = await repository.findByEmail(email)
    expect(user).toBeNull()

    expect(repository.users.length).toEqual(0)
})

test("deleteUser with invalid id", async () => {
    const repository = new InMemoryUserRepository()

    const { id } = await repository.create(createUserFactory())

    expect(
        async () => await deleteUser(repository, id + "invalid")
    ).rejects.toThrowError("User not found")
})
