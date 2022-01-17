
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { LegalInsuranceService } from '@modules/legal-insurance/services/legal-insurance.service';
import { Service } from 'typedi';

@Service()
export class LegalInsuranceController {
  constructor() {}

  // public async get(req : Request, res : Response) : Promise<any> {
  //   try {
      
  //   } catch (error) {
  //     console.error(error);
  //     res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
  //   }
  // }

  public async upsert(req, res : Response) : Promise<any> {
    try {
      console.log(req);
      console.log("UPSERT IS BENIG CALLED\n\n\n")
      console.log("req.body", req.body);
      const created = await LegalInsuranceService.upsert(req.body);
      res.status(StatusConstants.OK).send(created);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}


