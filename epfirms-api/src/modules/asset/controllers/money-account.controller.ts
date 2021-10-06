import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class MoneyAccountController {
  constructor() {}

  public async addMoneyAccount(req: any, resp: Response): Promise<any> {
    try {
      const { user_id } = req.params;
      const account = req.body;

      account.user_id = user_id;

      const createdAccount = await AssetService.addMoneyAccount(account);
      
      resp.status(StatusConstants.OK).send(createdAccount);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async removeMoneyAccount(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;

      await AssetService.deleteMoneyAccount(parseInt(id));
      
        resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async updateMoneyAccount(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedRealEstate = await AssetService.updateMoneyAccount(parseInt(id), data);
        resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }
}
