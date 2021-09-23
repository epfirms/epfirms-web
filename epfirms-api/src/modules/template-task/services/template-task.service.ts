import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');




export class TemplateTaskService {
  public static async create(data):Promise<any> {
    try {
      const updated = await Database.models.template_task.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(data):Promise<any> {
    try {
      const updated = await Database.models.template_task.update(data, {where: {id: data.id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async delete(id):Promise<any> {
    try {
      const deleted = await Database.models.template_task.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    } catch (err) {
      console.error(err);
    }
  }
}
