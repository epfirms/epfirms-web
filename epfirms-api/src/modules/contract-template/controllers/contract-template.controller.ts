
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { ContractTemplateService } from '@modules/contract-template/services/contract-template.service';
import { Service } from 'typedi';

@Service()
export class ContractTemplateController {
  constructor() {}

  public async upsert(req, res : Response) : Promise<any> {
    try {
      console.log("THE REQ BODY");
      console.log(req.body);
      const created = await ContractTemplateService.upsert(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);

    }
  }

  
}


