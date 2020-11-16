import AppError from '@shared/errors/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let fakeCacheProvider: FakeCacheProvider;
let createUser:CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Renato da Silva Borges',
      email: 'renato.borges@hotmail.com',
      password: '12345678',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('renato.borges@hotmail.com');
  });

  it('should not be able to create a new user with same email', async () => {
    const user = await createUser.execute({
      name: 'Renato da Silva Borges',
      email: 'renato.borges@hotmail.com',
      password: '12345678',
    });

    await expect(
      createUser.execute({
        name: 'Renato da Silva Borges',
        email: 'renato.borges@hotmail.com',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
