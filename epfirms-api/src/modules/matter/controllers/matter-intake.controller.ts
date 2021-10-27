import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { MatterTaskService } from '../services/matter-task.service';
import { UserService } from '@src/modules/user/services/user.service';
import { FirmService } from '@src/modules/firm/services/firm.service';
import { emailsService } from '@src/modules/emails/services/emails.service';

export class MatterIntakeController {
  constructor() {}

  public async create(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const { firm_id } = req.user.firm_access;
      const matter_id = req.body.matter_id;
      
      const createdIntake = await MatterService.createIntake(matter_id, id);

      await MatterService.update({id: createdIntake.matter_id, matter_intake_id: createdIntake.id});
      
      const matter = await MatterService.getOne(createdIntake.matter_id);
      
      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const matterIntakeData = req.body;

      const updatedIntake = await MatterService.updateIntake(matterIntakeData);
      
      const matter = await MatterService.getOne(updatedIntake.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async addSpouse(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const spouseData = req.body.spouse;
      const matterId = req.body.matter_id;

      const createdUser = await UserService.create(spouseData);
      
      if (createdUser) {
        await MatterService.update({id: matterId, spouse_id: createdUser.id});
      }

      const matter = await MatterService.getOne(matterId);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  //TODO: Verify that current user is authorized to update the spouse's information
  public async updateSpouse(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const spouseData = req.body.spouse;
      const matterId = req.body.matter_id;

      await UserService.update(spouseData);
      
      const matter = await MatterService.getOne(matterId);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
