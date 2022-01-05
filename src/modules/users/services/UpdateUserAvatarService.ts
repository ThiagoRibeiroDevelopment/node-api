import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import path from 'path/posix';
import fs from 'fs';
// import { fstat } from 'fs';
// import DiskStorageProvider from '@shared/providers/StorageProvider/DiskStorageProvider';
// import S3StorageProvider from '@shared/providers/StorageProvider/S3StorageProvider';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    // if (uploadConfig.driver === 's3') {
    //   const s3Provider = new S3StorageProvider();
    //   if (user.avatar) {
    //     await s3Provider.deleteFile(user.avatar);
    //   }
    //   const filename = await s3Provider.saveFile(avatarFilename);
    //   user.avatar = filename;
    // } else {
    //   const diskProvider = new DiskStorageProvider();
    //   if (user.avatar) {
    //     await diskProvider.deleteFile(user.avatar);
    //   }
    //   const filename = await diskProvider.saveFile(avatarFilename);
    //   user.avatar = filename;
    // }

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
