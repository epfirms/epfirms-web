import { Database } from '@src/core/Database';

export class AssetService {
  public static async getAssetsByUserId(userId: number): Promise<any> {
    const { money_account, real_estate, vehicle } = Database.models;
    
    const userMoneyAccounts = await money_account.findAll({where: {user_id: userId}});
    const userRealEstate = await real_estate.findAll({where: {user_id: userId}});
    const userVehicle = await vehicle.findAll({where: {user_id: userId}});

    return Promise.resolve({
      money_account: userMoneyAccounts,
      real_estate: userRealEstate,
      vehicle: userVehicle
    });
  }

  public static async addMoneyAccount(account: any): Promise<any> {
    const { money_account } = Database.models;

    const createdAccount = await money_account.create(account);

    return Promise.resolve(createdAccount);
  }

  public static async deleteMoneyAccount(id: number): Promise<any> {
    const { money_account } = Database.models;

    const deletedAccount = await money_account.destroy({ where: { id }});

    return Promise.resolve(deletedAccount);
  }

  public static async addRealEstate(realEstate: any): Promise<boolean> {
    const { real_estate } = Database.models;

    const createdRealEstate = await real_estate.create(realEstate);

    return Promise.resolve(createdRealEstate);
  }

  public static async deleteRealEstate(id: number): Promise<boolean> {
    const { real_estate } = Database.models;

    const deleted = await real_estate.destroy({ where: { id }});

    return Promise.resolve(deleted);
  }

  public static async addVehicle(vehicleData: any): Promise<boolean> {
    const { vehicle } = Database.models;

    const createdVehicle = await vehicle.create(vehicleData);

    return Promise.resolve(createdVehicle);
  }

  public static async deleteVehicle(id: number): Promise<boolean> {
    const { vehicle } = Database.models;

    const deleted = await vehicle.destroy({ where: { id }});

    return Promise.resolve(deleted);
  }
}
