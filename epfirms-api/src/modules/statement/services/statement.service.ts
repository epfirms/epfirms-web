import { Database } from '@src/core/Database';

export class StatementService {

  public static async create(data) : Promise<any> {
    try {
      const created = await Database.models.statement.create(data);
      return Promise.resolve(created);
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(body) : Promise<any> {
    try {
      const updated = await Database.models.statement.update(body, {where: {id: body.id}});
      return Promise.resolve(updated);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async delete(id) : Promise<any> {
    try {
      const deleted = await Database.models.statement.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    }
    catch (err) {
      console.error(err);
    }
  }
}
