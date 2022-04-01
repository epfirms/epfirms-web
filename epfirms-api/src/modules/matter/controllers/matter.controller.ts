import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { UserService } from '@modules/user/services/user.service';
import { emailsService } from '@src/modules/emails/services/emails.service';
import { FirmService } from '@src/modules/firm/services/firm.service';
import { Service } from 'typedi';

@Service()
export class MatterController {
  constructor(private _firmService: FirmService, private _emailService: emailsService, private _matterService: MatterService, private _userService: UserService) {}

  public async getMattersForCurrentUser(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const matters = await this._matterService.getByUserId(id);

      resp.status(StatusConstants.OK).send(matters);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getMattersForFirm(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;
      const matters = await this._matterService.getAll(firm_id);

      resp.status(StatusConstants.OK).send(matters);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createMatter(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const { firm_id } = req.user.firm_access;
      let { matter } = req.body;

      matter = {
        firm_id,
        ...matter
      }

      const createdMatter = await this._matterService.create(matter, firm_id);
      
      const newMatter = await this._matterService.getOne(createdMatter.id);
      
      const isClientRegistered = await this._userService.isRegistered(newMatter.client_id);

      if (!isClientRegistered) {
        const matterClient = await this._userService.get('id', newMatter.client_id);
        const firm = await this._firmService.get(firm_id);
        await this._emailService.sendClientPortalInvite(matterClient.email, firm.name);
      }
      
      resp.status(StatusConstants.OK).send(newMatter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async deleteMatter(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.body;
      await this._matterService.delete(id);

      resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async updateMatter(req: any, resp: Response): Promise<any> {
    try {
      const matter = req.body;
      await this._matterService.update(matter);
      const updatedMatter = await this._matterService.getOne(matter.id);

      resp.status(StatusConstants.OK).send(updatedMatter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getMatterById(req: any, resp: Response): Promise<any> {
    try {
      const id = req.params.id;
      const foundMatter = await this._matterService.getById(id);

      resp.status(StatusConstants.OK).send(foundMatter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
