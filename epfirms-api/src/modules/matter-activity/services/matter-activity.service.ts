import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');




export class MatterActivityService {

  public static async create(data) : Promise<any> {
    try {
      const created = await Database.models.matter_activity.create(data);
      return Promise.resolve(created);
    } catch (err) {
      console.error(err);
    }
  }
  public static async getAllByMatterId(matterId) : Promise<any> {
    try {
      const queried = await Database.models.matter_activity.findAll({where: {matter_id: matterId}});
      return Promise.resolve(queried);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async update(id) : Promise<any> {
    try {
      const updated = await Database.models.matter_activity.update({where: {id: id}});
      return Promise.resolve(updated);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async delete(id) : Promise<any> {
    try {
      const deleted = await Database.models.matter_activity.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    }
    catch (err) {
      console.error(err);
    }
  }
}
