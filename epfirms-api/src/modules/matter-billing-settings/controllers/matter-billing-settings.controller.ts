import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterBillingSettingsService } from '../services/matter-billing-settings.service';

const passport = require('passport');

export class MatterBillingSettingsController {
  constructor() {}

  public async create(req, res : Response) : Promise<any>{
    try {
      const created = await MatterBillingSettingsService.upsert(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
