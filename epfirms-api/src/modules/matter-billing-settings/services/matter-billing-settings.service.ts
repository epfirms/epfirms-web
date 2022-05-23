import { Database } from '@src/core/Database';

export class MatterBillingSettingsService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.matter_billing_settings.upsert(data);
      return Promise.resolve(created);
    } catch (err) {
      console.error(err);
    }
  }

  public static async getWithMatterId(matter_id): Promise<any> {
    try {
      const found = await Database.models.matter_billing_settings.findOne({
        where: {
          matter_id: matter_id,
        },
      });
      return Promise.resolve(found);
    } catch (error) {
      console.error(error);
    }
  }
}
