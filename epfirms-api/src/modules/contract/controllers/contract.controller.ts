
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { ContractService } from '@modules/contract/services/contract.service';
import { Service } from 'typedi';

@Service()
export class ContractController {
  constructor() {}

  public async upsert(req : Request, res) : Promise<any> {
    try {
      const contract = await ContractService.upsert(req.body);
      res.status(StatusConstants.OK).send(contract);

    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  
}


