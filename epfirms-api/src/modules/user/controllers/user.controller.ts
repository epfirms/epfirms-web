import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';

@Service()
export class UserController {
  constructor(private _userService: UserService) {}

  public async getUser(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const user = await this._userService.get('id', id);

      resp.status(StatusConstants.OK).send(user);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createUser(req: Request, resp: Response): Promise<any> {
    try {
      const { body } = req;
      let response = await this._userService.create(body);
      resp.status(StatusConstants.CREATED).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async updateUser(req: Request, resp: Response): Promise<any> {
    try {
      const { body } = req;
      let response = await this._userService.update(body);
      resp.status(StatusConstants.CREATED).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
