import { AssetController } from './asset.controller';
import { MoneyAccountController } from './money-account.controller';
import { RealEstateController } from './real-estate.controller';
import { VehicleController } from './vehicle.controller';

const assetController = new AssetController();
const moneyAccountController = new MoneyAccountController();
const realEstateController = new RealEstateController();
const vehicleController = new VehicleController();

export { assetController, moneyAccountController, realEstateController, vehicleController };
