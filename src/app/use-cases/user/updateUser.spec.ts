import { expect, test } from "vitest"
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository"
import { updateUser } from "./updateUser"
import { createUserFactory } from "../../factories/createUserFactory"

test("Should update user", async () => {
    const repository = new InMemoryUserRepository()

    const user = await repository.create(createUserFactory())

    const { updatedUser } = await updateUser({
        repository,
        id: user.id,
        user: {
            name: "New name",
        },
    })

    expect(updatedUser.name).toEqual("New name")
})

test("Should not update user with inexistent id", async () => {
    const repository = new InMemoryUserRepository()

    expect(
        async () =>
            await updateUser({
                repository,
                id: "inexistent id",
                user: {
                    name: "New name",
                },
            })
    ).rejects.toThrowError("User not found")
})

test("Should not update user with the same password", async () => {
    const repository = new InMemoryUserRepository()
    const user = await repository.create(
        createUserFactory({
            password: "test password",
        })
    )
    await expect(
        updateUser({
            repository,
            id: user.id,
            user: {
                password: "test password",
            },
        })
    ).rejects.toThrowError("Password must be different")
})
