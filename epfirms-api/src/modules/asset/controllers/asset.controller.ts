import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class AssetController {
  constructor() {}

  public async getAssetsById(req: Request, resp: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      
        resp.status(StatusConstants.OK).send();
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async getAssetsForCurrentUser(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;

      const userAssets = await AssetService.getAssetsByUserId(id);
      
        resp.status(StatusConstants.OK).send(userAssets);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }
}
