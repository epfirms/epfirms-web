import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class RealEstateController {
  constructor() {}

  public async addRealEstate(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const realEstate = req.body;

      realEstate.user_id = id;

      const created = await AssetService.addRealEstate(realEstate);

      resp.status(StatusConstants.OK).send(created);
    } catch (error) {
      console.log(error.message)
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async removeRealEstate(req: Request, resp: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      
        resp.status(StatusConstants.OK).send();
    } catch (error) {
      console.log(error.message)
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }
}
