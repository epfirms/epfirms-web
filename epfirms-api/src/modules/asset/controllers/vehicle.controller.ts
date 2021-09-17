import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class VehicleController {
  constructor() {}

  public async addVehicle(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.user;
      const vehicle = req.body;

      vehicle.user_id = id;

      const created = await AssetService.addVehicle(vehicle);

      resp.status(StatusConstants.OK).send(created);
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }

  public async removeVehicle(req: Request, resp: Response): Promise<any> {
    try {
      const { email, password } = req.body;
      
        resp.status(StatusConstants.OK).send();
    } catch (error) {
      resp.status(StatusConstants.UNAUTHORIZED).send({success: false, access_token: null, m: error.message});
    }
  }
}
