import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { ReferralService } from '@modules/referral/services/referral.service';
import { Service } from 'typedi';

@Service()
export class ReferralController {
  constructor() {}

  public async upsert(req: Request, res: Response): Promise<any> {
    try {
      const created = await ReferralService.upsert(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const deleted = await ReferralService.delete(req.params.id);
      res.status(StatusConstants.OK).send(true);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  public async getAllWithId(req: Request, res: Response): Promise<any> {
    try {
      const all = await ReferralService.getAllWithId(req.params.id);
      res.status(StatusConstants.OK).send(all);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  public async getOneWithMatterId(req: Request, res: Response): Promise<any> {
    try {
      const found = await ReferralService.getOneWithMatterId(req.params.matter_id);
      res.status(StatusConstants.OK).send(found);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }
}
