import { it, expect, describe, beforeEach } from "vitest";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { FetchTop10PlayersService } from "../fetch-best-players";


let userRepository: InMemoryUsersRepository;
let sut: FetchTop10PlayersService;

describe("Fetch Top 10 Players Service Test", async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository();
    sut = new FetchTop10PlayersService(userRepository);
  });

  it("should be able to fetch the top 10 players", async () => {
    await userRepository.create({ username: "player1", email: "p1@test.com", password_hash: "pass", bestScore: 1000 });
    await userRepository.create({ username: "player2", email: "p2@test.com", password_hash: "pass", bestScore: 1200 });
    await userRepository.create({ username: "player3", email: "p3@test.com", password_hash: "pass", bestScore: 900 });
    await userRepository.create({ username: "player4", email: "p4@test.com", password_hash: "pass", bestScore: 1500 });
    await userRepository.create({ username: "player5", email: "p5@test.com", password_hash: "pass", bestScore: 1100 });
    await userRepository.create({ username: "player6", email: "p6@test.com", password_hash: "pass", bestScore: 800 });
    await userRepository.create({ username: "player7", email: "p7@test.com", password_hash: "pass", bestScore: 1300 });
    await userRepository.create({ username: "player8", email: "p8@test.com", password_hash: "pass", bestScore: 700 });
    await userRepository.create({ username: "player9", email: "p9@test.com", password_hash: "pass", bestScore: 1400 });
    await userRepository.create({ username: "player10", email: "p10@test.com", password_hash: "pass", bestScore: 600 });
    await userRepository.create({ username: "player11", email: "p11@test.com", password_hash: "pass", bestScore: 1600 });
    await userRepository.create({ username: "player12", email: "p12@test.com", password_hash: "pass", bestScore: 500 });

    const { users } = await sut.execute();

    expect(users).toHaveLength(10);
    expect(users[0].username).toEqual("player11");
    expect(users[0].bestScore).toEqual(1600);
    expect(users[1].username).toEqual("player4");
    expect(users[1].bestScore).toEqual(1500);
    expect(users[9].bestScore).toEqual(700);
  });

  it("should return fewer than 10 players if less than 10 exist", async () => {
    await userRepository.create({ username: "singlePlayer", email: "s@test.com", password_hash: "pass", bestScore: 500 });

    const { users } = await sut.execute();

    expect(users).toHaveLength(1);
    expect(users[0].username).toEqual("singlePlayer");
  });

  it("should return an empty array if no players exist", async () => {
    const { users } = await sut.execute();

    expect(users).toHaveLength(0);
    expect(users).toEqual([]);
  });
});