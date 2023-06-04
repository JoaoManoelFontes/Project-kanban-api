import { expect, test } from "vitest";
import { InMemoryUserRepository } from "../../../database/inMemory/inMemoryUserRepository";
import { userLogin } from "./userLogin";
import { createUserFactory } from "../../factories/createUserFactory";
import { createUser } from "./createUser";

test("userLogin", async () => {
  const repository = new InMemoryUserRepository();

  const { email, password } = createUserFactory();

  const user = await createUser(repository, createUserFactory());

  if (user instanceof Error || Array.isArray(user)) {
    throw new Error("Error creating user");
  }

  const result = await userLogin(repository, { email, password });
  if( result instanceof Error || Array.isArray(result)) {
    throw new Error("Error creating user");
  }

  
  expect(result).toStrictEqual(expect.any(String));
});

test("userLogin with invalid email", async () => {
  const repository = new InMemoryUserRepository();

  const { password } = createUserFactory();

  const user = await createUser(repository, createUserFactory());

  if (user instanceof Error || Array.isArray(user)) {
    throw new Error("Error creating user");
  }

  const result = await userLogin(repository, {
    email: "emailNotRegistered@gmail.com",
    password,
  });

  expect(result).toBeInstanceOf(Error);
  if (result instanceof Error) {
    expect(result.message).toEqual("User not found");
  }
});

test("userLogin with invalid password", async () => {
  const repository = new InMemoryUserRepository();

  const { email } = createUserFactory();

  const user = await createUser(repository, createUserFactory());

  if (user instanceof Error || Array.isArray(user)) {
    throw new Error("Error creating user");
  }

  const result = await userLogin(repository, {
    email,
    password: "invalidPassword",
  });

  expect(result).toBeInstanceOf(Error);
  if (result instanceof Error) {
    expect(result.message).toEqual("Password doesn't match");
  }
});
