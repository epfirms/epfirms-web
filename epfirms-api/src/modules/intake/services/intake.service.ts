import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class IntakeService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.matter_intake.upsert(data);

      return Promise.resolve(created);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id): Promise<any> {
    try {
      const deleted = await Database.models.matter_intake.destroy({ where: { id: id } });
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getOneWithMatterId(id): Promise<any> {
    try {
      const found = await Database.models.matter_intake.findOne({ where: { matter_id: id } });
      return Promise.resolve(found);
    } catch (error) {
      console.error(error);
    }
  }
}
