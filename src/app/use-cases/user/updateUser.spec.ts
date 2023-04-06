import { expect, test } from "vitest";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { updateUser } from "./updateUser";
import { createUserFactory } from "../../factories/createUserFactory";
import bycrypt from "bcrypt";

test("Should update user", async () => {
  const repository = new InMemoryUserRepository();

  const user = await repository.create(createUserFactory());

  const updatedUser = await updateUser({
    repository,
    id: user.id,
    user: {
      name: "New name",
    },
  });

  if (!Array.isArray(updatedUser) || updatedUser instanceof Error) {
    expect(updatedUser.name).toEqual("New name");
  }
});

test("Should not update user with invalid email", async () => {
  const repository = new InMemoryUserRepository();

  const user = await repository.create(createUserFactory());

  const updatedUser = await updateUser({
    repository,
    id: user.id,
    user: {
      email: "invalid email",
    },
  });

  expect(updatedUser).toMatchObject([
    {
      validation: "email",
      code: "invalid_string",
      message: "Invalid email",
      path: ["email"],
    },
  ]);
});

test("Should not update user with inexistent id", async () => {
  const repository = new InMemoryUserRepository();

  const updatedUser = await updateUser({
    repository,
    id: "inexistent id",
    user: {
      name: "New name",
    },
  });

  expect(updatedUser).toBeInstanceOf(Error);

  if (updatedUser instanceof Error) {
    expect(updatedUser.message).toEqual("User not found");
  }
});
