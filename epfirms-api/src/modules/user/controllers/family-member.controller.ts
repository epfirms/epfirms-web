import { Response, Request } from 'express';
import { UserService } from '@modules/user/services/user.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';

@Service()
export class FamilyMemberController {
  constructor(private _userService: UserService) {}

  public async getByUserId(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
        const familyMembers = await this._userService.getAllFamilyMembers(id);
      resp.status(StatusConstants.OK).send(familyMembers);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getAll(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
        const familyMembers = await this._userService.getAllFamilyMembers(id);
      resp.status(StatusConstants.OK).send(familyMembers);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async create(req: any, resp: Response): Promise<any> {
    try {
      const { user_id } = req.params;
      const familyMemberData = req.body;
      const familyMemberUser = await this._userService.addFamilyMember(user_id, familyMemberData);       
      resp.status(StatusConstants.CREATED).send();
    } catch (error) {
      console.error(error);
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
        const { id } = req.user;
      const familyMemberData = req.body;
      let response = await this._userService.updateFamilyMember(familyMemberData);
      resp.status(StatusConstants.OK).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async remove(req: any, resp: Response): Promise<any> {
    try {
        const { id } = req.user;
      const familyMemberId = req.body.id;
      let response = await this._userService.removeFamilyMember(id, familyMemberId);
      resp.status(StatusConstants.OK).send(response);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async removeByUserId(req: any, resp: Response): Promise<any> {
    try {
      const { user_id, family_member_id } = req.params;
      let response = await this._userService.removeFamilyMember(user_id, family_member_id);
      resp.status(StatusConstants.OK).send({status: 'success'});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
