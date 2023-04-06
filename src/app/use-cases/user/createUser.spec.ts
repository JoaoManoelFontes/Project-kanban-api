import { expect, test } from "vitest";
import { createUser } from "./createUser";
import bcrypt from "bcrypt";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { createUserFactory } from "../../factories/createUserFactory";

test("createUser", async () => {
  const repository = new InMemoryUserRepository();
  const user = createUserFactory();

  await createUser(repository, user);

  expect(repository.users[0].name).toEqual(user.name);
  expect(bcrypt.compareSync(user.password, repository.users[0].password)).true;
});

test("createUser with invalid email", async () => {
  const repository = new InMemoryUserRepository();
  const user = createUserFactory({ email: "invalid email" });

  const result = await createUser(repository, user);

  expect(result).toMatchObject([
    {
      validation: "email",
      code: "invalid_string",
      message: "Invalid email",
      path: ["email"],
    },
  ]);
});

test("createUser with existent email", async () => {
  const repository = new InMemoryUserRepository();
  const user = createUserFactory();
  await createUser(repository, user);

  const result = await createUser(repository, user);
  expect(result).toBeInstanceOf(Error);

  if (result instanceof Error) {
    expect(result.message).toEqual("Email already registered");
  }
});
