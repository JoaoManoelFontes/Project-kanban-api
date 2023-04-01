import { expect, test } from "vitest";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { userLogin } from "./userLogin";
import { createUserFactory } from "../../factories/createUserFactory";

const repository = new InMemoryUserRepository();

test("userLogin", async () => {
  const { email, password } = await repository.create(createUserFactory());

  const result = await userLogin(repository, { email, password });

  expect(result).toBeTruthy();
});

test("userLogin with invalid email", async () => {
  const { password } = await repository.create(createUserFactory());

  const result = await userLogin(repository, {
    email: "emailNotCadastred@gmail.com",
    password,
  });
  console.log(result);

  expect(result).toBeInstanceOf(Error);
  if (result instanceof Error) {
    expect(result.message).toEqual("User not found");
  }
});

test("userLogin with invalid password", async () => {
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
