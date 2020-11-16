import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUserRepository;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Renato Borges Teste',
      email: 'renatoteste@exemplate.com',
    });

    expect(updatedUser.name).toBe('Renato Borges Teste');
  });

  it('should be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'non-existing-id',
        name: 'Test',
        email: 'test@exemple.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      password: '123',
    });

    const user = await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato_teste@exemplate.com',
      password: '123',
    });


    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renato Borges Teste',
        email: 'renato@exemplate.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      password: '123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      old_password: '123',
      password: '123456',
    });

    expect(updatedUser.password).toBe('123456');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renato Borges Teste',
        email: 'renatoteste@exemplate.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password without wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Renato Borges',
      email: 'renato@exemplate.com',
      password: '123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Renato Borges Teste',
        email: 'renatoteste@exemplate.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

});
