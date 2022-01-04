import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { instanceToInstance } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      user_id: request.user.id,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      avatarFilename: request.file.filename,
    });

    return response.json(instanceToInstance(user));
  }
}
