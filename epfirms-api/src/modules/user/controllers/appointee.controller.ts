import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';

@Service()
export class AppointeeController {
  constructor(private _userService: UserService) {}

  public async getByUserId(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
        const familyMembers = await this._userService.getAllAppointees(id);
      resp.status(StatusConstants.OK).send(familyMembers);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getAll(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
        const familyMembers = await this._userService.getAllAppointees(id);
      resp.status(StatusConstants.OK).send(familyMembers);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async create(req: any, resp: Response): Promise<any> {
    try {
      const { user_id } = req.params;
      const familyMemberData = req.body;
        const familyMemberUser = await this._userService.addAppointee(user_id, familyMemberData);       
      resp.status(StatusConstants.CREATED).send(familyMemberUser);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
        const { appointee_id } = req.params;
      const appointeeData = req.body;
      let response = await this._userService.updateAppointee(appointee_id, appointeeData);
      resp.status(StatusConstants.OK).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async remove(req: any, resp: Response): Promise<any> {
    try {
      const { user_id, appointee_id } = req.params;

      let response = await this._userService.removeAppointee(user_id, appointee_id);
      resp.status(StatusConstants.OK).send({status: 'success'});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
