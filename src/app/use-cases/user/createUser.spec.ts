import { expect, test } from "vitest";
import { createUser } from "./createUser";
import bcrypt from "bcrypt";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { createUserFactory } from "../../factories/createUserFactory";

test("createUser", () => {
  const repository = new InMemoryUserRepository();
  const user = createUserFactory();

  createUser(repository, user);

  expect(repository.users[0].name).toEqual(user.name);
  expect(bcrypt.compareSync(user.password, repository.users[0].password)).true;
});
