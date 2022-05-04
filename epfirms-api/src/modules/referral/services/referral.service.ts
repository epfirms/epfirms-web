import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class ReferralService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.referral.upsert(data, { where: { id: data.id } });
      return Promise.resolve(created);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id): Promise<any> {
    try {
      const deleted = await Database.models.referral.destroy({ where: { id: id } });
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getAllWithId(id): Promise<any> {
    try {
      const all = await Database.models.referral.findAll({ where: { id: id } });
      return Promise.resolve(all);
    } catch (error) {
      console.error(error);
    }
  }
  public static async getOneWithMatterId(matter_id): Promise<any> {
    try {
      const found = await Database.models.referral.findOne({ where: { matter_id: matter_id } });
      return Promise.resolve(found);
    } catch (error) {
      console.error(error);
    }
  }
}
