import { expect, test } from "vitest"
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository"
import { userAuthentication } from "./userAuthentication"
import { createUserFactory } from "../../factories/createUserFactory"

test("userAuthentication", async () => {
    const repository = new InMemoryUserRepository()

    const user = await repository.create(createUserFactory())

    const { email } = user

    const result = await userAuthentication({
        userRepository: repository,
        user: { email, password: "password" },
    })

    expect(result.token).toStrictEqual(expect.any(String))
    expect(result.user).toEqual(repository.users[0])
})

test("userAuthentication with invalid email", async () => {
    const repository = new InMemoryUserRepository()
    expect(
        async () =>
            await userAuthentication({
                userRepository: repository,
                user: {
                    email: "invalid email",
                    password: "password",
                },
            })
    ).rejects.toThrowError("User not found")
})

test("userAuthentication with invalid password", async () => {
    const repository = new InMemoryUserRepository()

    const user = await repository.create(createUserFactory())

    const { email } = user

    await expect(
        userAuthentication({
            userRepository: repository,
            user: {
                email,
                password: "invalid password",
            },
        })
    ).rejects.toThrowError("Password doesn't match")
})
