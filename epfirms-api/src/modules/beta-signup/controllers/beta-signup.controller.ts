import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { BetaSignupService } from '../services/beta-signup.service';
import { Service } from 'typedi';

@Service()
export class BetaSignupController {
  constructor(private _betaSignupService: BetaSignupService) {}

  public async signup(req : any, res: Response):Promise<any> {
    try {
      const contactDetails = req.body;

      const created = await this._betaSignupService.create(contactDetails);
      
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}