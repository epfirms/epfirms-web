import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { TeamService } from '@src/modules/team/team.service';

@Service()
export class UserController {
  constructor(private _userService: UserService, private _teamService: TeamService) {}

  public async getUser(req: any, resp: Response): Promise<any> {
    try {
      const id = req.params && req.params.id ? req.params.id : 'me';

      let userId = id === 'me' ? req.user.id : id;

      const column = id.startsWith('+1') ? 'cell_phone' : 'id';

      let response = await this._userService.get(column, userId);

      resp.status(StatusConstants.OK).send(response);
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

  public async upsertUser(req: any, resp: Response): Promise<any> {
    try {
      const { body } = req;
      const response = await this._userService.upsertUser(body);
      resp.status(StatusConstants.OK).send(response);
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

  public async getTeamsForUser(req: any, resp: Response): Promise<any> {
    try {
      const id = req.params.id === 'me' ? req.user.id : req.params.id;
      const firmId = req.user.firm_access.firm_id;
      const response = await this._teamService.findAllByUserId(firmId, id, req.query);
      resp.status(StatusConstants.OK).send({data: response});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async validateEmailAddress(req: any, resp: Response): Promise<any> {
    try {
      const email = req.params.email;
      const isValid = await this._userService.validateEmail(email);
      const response: {valid: boolean; duplicate?: boolean} = {valid: isValid};

      if (!isValid) {
        response.duplicate = true;
      }
      resp.status(StatusConstants.OK).send({data: response});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
