import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { RegisterService } from "../register";
import { compare } from "bcryptjs";

let userRepository: InMemoryUsersRepository;
let sut: RegisterService;

describe("Register Service", async () => {
  beforeEach(() => {
    userRepository = new InMemoryUsersRepository;
    sut = new RegisterService(userRepository)
  })

  it("Should be able to register", async () => {
    const { user } = await sut.execute({
      username: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("Should hashed the user password upon registration", async () => {
    const { user } = await sut.execute({
      username: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await compare("123456", user.password_hash);

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("Should not be able to register twice it the same email", async () => {
    await sut.execute({
      username: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        username: "fulano",
        email: "fulano@gmail.com",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(Error);
  });


  it("Should initialize bestScore to 0 and lastPlayed to current date", async () => {
    const { user } = await sut.execute({
      username: "fulano",
      email: "fulano@gmail.com",
      password: "123456",
    });
  
    expect(user.bestScore).toBe(0);
    expect(user.lastPlayed).toBeInstanceOf(Date);
  });

})