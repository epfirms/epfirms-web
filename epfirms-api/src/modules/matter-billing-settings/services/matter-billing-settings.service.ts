import { Database } from '@src/core/Database';



export class MatterBillingSettingsService {


  public static async upsert(data) : Promise<any> {
    try {
      const created = await Database.models.matter_billing_settings.upsert(data);
      return Promise.resolve(created);
    } catch (err) {
      console.error(err);
    }
  }
}
