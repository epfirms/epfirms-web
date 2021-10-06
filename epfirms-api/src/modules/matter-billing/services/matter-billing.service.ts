import { Database } from '@src/core/Database';

export class MatterBillingService {

  public static async create(data) : Promise<any> {
    try {
      const created = await Database.models.matter_billing.create(data);
      return Promise.resolve(created);
    } catch (err) {
      console.error(err);
    }
  }
  public static async getAllByMatterId(matterId) : Promise<any> {
    try {
      const queried = await Database.models.matter_billing.findAll({where: {matter_id: matterId}});
      return Promise.resolve(queried);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async update(id) : Promise<any> {
    try {
      const updated = await Database.models.matter_billing.update({where: {id: id}});
      return Promise.resolve(updated);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async delete(id) : Promise<any> {
    try {
      const deleted = await Database.models.matter_billing.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    }
    catch (err) {
      console.error(err);
    }
  }
}
