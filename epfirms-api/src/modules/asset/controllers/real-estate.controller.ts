import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class RealEstateController {
  constructor() {}

  public async addRealEstate(req: any, resp: Response): Promise<any> {
    try {
      const { user_id } = req.params;
      const realEstate = req.body;

      realEstate.user_id = user_id;

      const created = await AssetService.addRealEstate(realEstate);

      resp.status(StatusConstants.OK).send(created);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async removeRealEstate(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      await AssetService.deleteRealEstate(parseInt(id));
        resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async updateRealEstate(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedRealEstate = await AssetService.updateRealEstate(parseInt(id), data);
        resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }
}
