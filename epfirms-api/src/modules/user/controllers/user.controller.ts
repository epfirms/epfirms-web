import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';

export class UserController {
  constructor() {}

  public async getUser(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const user = await UserService.get('id', id);

      resp.status(StatusConstants.OK).send(user);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createUser(req: Request, resp: Response): Promise<any> {
    try {
      const { body } = req;
      let response = await UserService.create(body);
      resp.status(StatusConstants.CREATED).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async updateUser(req: Request, resp: Response): Promise<any> {
    try {
      const { body } = req;
      let response = await UserService.update(body);
      resp.status(StatusConstants.CREATED).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
