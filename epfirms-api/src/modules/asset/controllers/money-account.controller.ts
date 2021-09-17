import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class MoneyAccountController {
  constructor() {}

  public async addMoneyAccount(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const account = req.body;

      account.user_id = id;

      const createdAccount = await AssetService.addMoneyAccount(account);
      
      resp.status(StatusConstants.OK).send(createdAccount);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async removeMoneyAccount(req: Request, resp: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      
        resp.status(StatusConstants.OK).send();
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }
}
