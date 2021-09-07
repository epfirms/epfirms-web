import { Response, Request } from 'express';
import { LegalAreaService } from '@modules/legal-area/services/legal-area.service';
import { StatusConstants } from '@src/constants/StatusConstants';

export class LegalAreaController {
  constructor() { }

  public async createLegalArea(req: any, resp: Response): Promise<any> {
    try {
      const firm_id = req.user.firm_access.firm_id;
      const { legalArea } = req.body;
      const legalAreaValue = {
        ...legalArea,
        firm_id
      }

      const newLegalArea = await LegalAreaService.create(legalAreaValue);

      resp.status(StatusConstants.OK).send(newLegalArea);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getLegalAreas(req: any, resp: Response): Promise<any> {
    try {
      const firm_id = req.user.firm_access.firm_id;
      const legalAreas = await LegalAreaService.getAll(firm_id);

      resp.status(StatusConstants.OK).send(legalAreas);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async removeLegalArea(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.body;
      const legalAreas = await LegalAreaService.delete(id);

      resp.status(StatusConstants.OK).send({id});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
