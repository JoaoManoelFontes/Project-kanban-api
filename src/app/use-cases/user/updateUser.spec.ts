import { expect, test } from "vitest";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { updateUser } from "./updateUser";
import { createUserFactory } from "../../factories/createUserFactory";

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

  expect(updatedUser).toMatchObject({
    id: user.id,
    name: "New name",
    password: user.password,
    email: user.email,
  });
});
