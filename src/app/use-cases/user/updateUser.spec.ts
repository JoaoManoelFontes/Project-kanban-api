import { expect, test } from "vitest";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { updateUser } from "./updateUser";
import { createUser } from "./createUser";
import { createUserFactory } from "../../factories/createUserFactory";

test("Should update user", async () => {
  const repository = new InMemoryUserRepository();

  const user = await createUser(repository, createUserFactory());

  if (user instanceof Error || Array.isArray(user)) {
    throw new Error("Error creating user");
  }

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

  const user = await createUser(repository, createUserFactory());

  if (user instanceof Error || Array.isArray(user)) {
    throw new Error("Error creating user");
  }

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

  expect(repository.users[0].email != "invalid email");
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

test("Should not update user with the same password", async () => {
  const repository = new InMemoryUserRepository();
  const user = await createUser(repository, createUserFactory());

  if (user instanceof Error || Array.isArray(user)) {
    throw new Error("Error creating user");
  }

  const updatedUser = await updateUser({
    repository,
    id: user.id,
    user: {
      password: "password",
    },
  });
  expect(updatedUser).toBeInstanceOf(Error);
  if (updatedUser instanceof Error) {
    expect(updatedUser.message).toEqual("Password must be different");
  }
});
