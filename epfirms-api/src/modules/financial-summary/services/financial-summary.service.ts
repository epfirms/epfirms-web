import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class FinancialSummaryService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.financial_summary.upsert(data);
      return Promise.resolve(created);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id): Promise<any> {
    try {
      const deleted = await Database.models.financial_summary.destroy({ where: { id: id } });
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getAllWithId(id): Promise<any> {
    try {
      const all = await Database.models.financial_summary.findAll({ where: { user_id: id } });
      return Promise.resolve(all);
    } catch (error) {
      console.error(error);
    }
  }
}
