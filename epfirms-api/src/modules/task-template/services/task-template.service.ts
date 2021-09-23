import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');




export class TaskTemplateService {
  public static async create(data):Promise<any> {
    try {
      const updated = await Database.models.task_template.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(data):Promise<any> {
    try {
      const updated = await Database.models.task_template.update(data, {where: {id: data.id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async delete(id):Promise<any> {
    try {
      const deleted = await Database.models.task_template.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    } catch (err) {
      console.error(err);
    }
  }
}
