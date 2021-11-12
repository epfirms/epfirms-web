import { Response, Request } from "express";
import { AssetService } from "@modules/asset/services/asset.service";
import { StatusConstants } from "@src/constants/StatusConstants";

export class VehicleController {
  constructor() {}

  public async addVehicle(req: any, resp: Response): Promise<any> {
    try {
      const { user_id } = req.params;
      const vehicle = req.body;

      vehicle.user_id = user_id;

      const created = await AssetService.addVehicle(vehicle);

      resp.status(StatusConstants.OK).send(created);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send({success: false, access_token: null, m: error.message});
    }
  }

  public async removeVehicle(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      await AssetService.deleteVehicle(parseInt(id));
        resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send({success: false, access_token: null, m: error.message});
    }
  }

  public async updateVehicle(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedVehicle = await AssetService.updateVehicle(parseInt(id), data);
        resp.status(StatusConstants.OK).send({success: true});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send({success: false, access_token: null, m: error.message});
    }
  }
}
