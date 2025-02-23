import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class InvoiceService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.invoice.upsert(data, { where: { id: data.id } });
      return Promise.resolve(created);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id): Promise<any> {
    try {
      const deleted = await Database.models.invoice.destroy({ where: { id: id } });
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getAllWithId(id): Promise<any> {
    try {
      const all = await Database.models.invoice.findAll({ where: { id: id } });
      return Promise.resolve(all);
    } catch (error) {
      console.error(error);
    }
  }

  public static getOneWithId(id): Promise<any> {
    try {
      const one = Database.models.invoice.findOne({ where: { id: id } });
      return Promise.resolve(one);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getAllWithFirmId(firmId): Promise<any> {
    try {
      const all = await Database.models.invoice.findAll({ where: { firm_id: firmId }, include: { model: Database.models.user}});
      return Promise.resolve(all);
    } catch (error) {
      console.error(error);
    }
  }

}
