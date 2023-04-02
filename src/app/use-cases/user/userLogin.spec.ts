import { expect, test } from "vitest";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { userLogin } from "./userLogin";
import { createUserFactory } from "../../factories/createUserFactory";

test("userLogin", async () => {
  const repository = new InMemoryUserRepository();

  const { email, password } = await repository.create(createUserFactory());

  const result = await userLogin(repository, { email, password });

  expect(result).toBeTruthy();
});

test("userLogin with invalid email", async () => {
  const repository = new InMemoryUserRepository();

  const { password } = await repository.create(createUserFactory());

  const result = await userLogin(repository, {
    email: "emailNotRegistered@gmail.com",
    password,
  });
  console.log(result);

  expect(result).toBeInstanceOf(Error);
  if (result instanceof Error) {
    expect(result.message).toEqual("User not found");
  }
});

test("userLogin with invalid password", async () => {
  const repository = new InMemoryUserRepository();

  const { email } = await repository.create(createUserFactory());

  const result = await userLogin(repository, {
    email,
    password: "invalidPassword",
  });

  expect(result).toBeInstanceOf(Error);
  if (result instanceof Error) {
    expect(result.message).toEqual("Password doesn't match");
  }
});
