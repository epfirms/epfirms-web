import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';

export class AppointeeController {
  constructor() {}

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
      const { id } = req.user;
      const familyMemberData = req.body;
        const familyMemberUser = await UserService.addAppointee(id, familyMemberData);       
      resp.status(StatusConstants.CREATED).send(familyMemberUser);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
        const { id } = req.user;
      const familyMemberData = req.body;
      let response = await UserService.updateAppointee(familyMemberData);
      resp.status(StatusConstants.OK).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async remove(req: any, resp: Response): Promise<any> {
    try {
        const { id } = req.user;
      const familyMemberId = req.body.id;
      let response = await UserService.removeAppointee(id, familyMemberId);
      resp.status(StatusConstants.CREATED).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
