import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';

export class AppointeeController {
  constructor() {}

  public async getByUserId(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
        const familyMembers = await UserService.getAllAppointees(id);
      resp.status(StatusConstants.OK).send(familyMembers);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getAll(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
        const familyMembers = await UserService.getAllAppointees(id);
      resp.status(StatusConstants.OK).send(familyMembers);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async create(req: any, resp: Response): Promise<any> {
    try {
      const { user_id } = req.params;
      const familyMemberData = req.body;
        const familyMemberUser = await UserService.addAppointee(user_id, familyMemberData);       
      resp.status(StatusConstants.CREATED).send(familyMemberUser);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
        const { appointee_id } = req.params;
      const appointeeData = req.body;
      let response = await UserService.updateAppointee(appointee_id, appointeeData);
      resp.status(StatusConstants.OK).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async remove(req: any, resp: Response): Promise<any> {
    try {
      const { user_id, appointee_id } = req.params;

      let response = await UserService.removeAppointee(user_id, appointee_id);
      resp.status(StatusConstants.OK).send({status: 'success'});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
