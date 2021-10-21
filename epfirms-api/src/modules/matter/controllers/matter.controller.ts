import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { UserService } from '@modules/user/services/user.service';
import { emailsService } from '@src/modules/emails/services/emails.service';
import { FirmService } from '@src/modules/firm/services/firm.service';

const passport = require('passport');

export class MatterController {
  constructor() {}

  public async getMattersForCurrentUser(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const matters = await MatterService.getByUserId(id);

      resp.status(StatusConstants.OK).send(matters);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getMattersForFirm(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;
      const matters = await MatterService.getAll(firm_id);

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

      const createdMatter = await MatterService.create(matter, firm_id);

      // const createdIntake = await MatterService.createIntake(createdMatter.id, id);

      // await MatterService.update({id: createdIntake.matter_id, matter_intake_id: createdIntake.id});
      
      const newMatter = await MatterService.getOne(createdMatter.id);
      
      const matterClient = await UserService.get('id', newMatter.client_id);

      if (matterClient && matterClient.email && !matterClient.password) {
        const firm = await FirmService.get(firm_id);
        await emailsService.sendClientPortalInvite(matterClient.email, firm.name);
      }
      
      resp.status(StatusConstants.OK).send(newMatter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async deleteMatter(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.body;
      await MatterService.delete(id);

      resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async updateMatter(req: any, resp: Response): Promise<any> {
    try {
      const matter = req.body;
      await MatterService.update(matter);
      const updatedMatter = await MatterService.getOne(matter.id);

      resp.status(StatusConstants.OK).send(updatedMatter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
