import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { UserService } from '@src/modules/user/services/user.service';
import { Service } from 'typedi';

@Service()
export class MatterIntakeController {
  constructor(private _matterService: MatterService, private _userService: UserService) {}

  public async create(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const { firm_id } = req.user.firm_access;
      const matter_id = req.body.matter_id;
      
      const createdIntake = await this._matterService.createIntake(matter_id, id);

      await this._matterService.update({id: createdIntake.matter_id, matter_intake_id: createdIntake.id});
      
      const matter = await this._matterService.getOne(createdIntake.matter_id);
      
      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const matterIntakeData = req.body;

      const updatedIntake = await this._matterService.updateIntake(matterIntakeData);
      
      const matter = await this._matterService.getOne(updatedIntake.matter_id);

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

      const createdUser = await this._userService.create(spouseData);
      
      if (createdUser) {
        await this._matterService.update({id: matterId, spouse_id: createdUser.id});
      }

      const matter = await this._matterService.getOne(matterId);

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

      await this._userService.update(spouseData);
      
      const matter = await this._matterService.getOne(matterId);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
