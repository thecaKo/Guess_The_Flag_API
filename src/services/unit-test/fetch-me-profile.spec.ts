import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { it, expect, describe, beforeEach } from "vitest";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { FetchProfileByUserNameService } from "../fetch-me-profile";


let userRepository: InMemoryUsersRepository;
let sut: FetchProfileByUserNameService;

describe("Get Profile Service Test", async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new FetchProfileByUserNameService(userRepository);
  });

  it("should be able to fetch an user profile", async () => {
    await userRepository.create({
      username: "cako",
      email: "fulano@gmail.com",
      password_hash: "123456",
    });

    const { profile } = await sut.execute({
      username: "cako",
    });

    expect(profile.username).toEqual(expect.any(String));
  });

  it("should not be able to fetch an user profile does not exits", async () => {
    await expect(() => sut.execute({ username: "cako" })).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});