
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { ContractTemplateService } from '@modules/contract-template/services/contract-template.service';
import { Service } from 'typedi';

@Service()
export class ContractTemplateController {
  constructor() {}

  public async upsert(req : Request, res : Response) : Promise<any> {
    try {
      const created = await ContractTemplateService.upsert(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);

    }
  }

  
}


