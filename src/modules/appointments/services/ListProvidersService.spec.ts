import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUserRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProviders: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUserRepository,
      fakeCacheProvider,
    );
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      password: '123',
    });

    const user2 = await fakeUserRepository.create({
      name: 'Renato Borges 2',
      email: 'renato2@exemplate.com',
      password: '123',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'Renato Borges 3',
      email: 'renato2@exemplate.com',
      password: '123',
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([
      user1,
      user2
    ])
  });
});
