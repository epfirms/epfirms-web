
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { CustomerAccountService } from '@modules/customer-account/services/customer-account.service';
import { Service } from 'typedi';

@Service()
export class CustomerAccountController {
  constructor() {}

  
  public async upsert(req, res : Response) : Promise<any> {
    try {
      const created = await CustomerAccountService.upsert(req.body);
      res.status(StatusConstants.OK).send(created);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  public async getWithMatterId(req, res : Response) : Promise<any> {
    try {
      const account = await CustomerAccountService.getWithMatterId(req.params.matterId);
      res.status(StatusConstants.OK).send(account);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}


