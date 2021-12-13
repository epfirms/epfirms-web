import { Database } from '@src/core/Database';

export class TaskTemplateService {
  public static async get(firmId: number):Promise<any> {
    try {
      const {firm_task_template, firm_template_task, user} = Database.models;

      const taskTemplates = await firm_task_template.findAll({where: {
        firm_id: firmId
      }, include: {
        model: firm_template_task,
        include: [
          {
            model: user,
          }
        ]}});
      return Promise.resolve(taskTemplates);
    } catch (err) {
      console.error(err);
    }
  }

  public static async create(data):Promise<any> {
    try {
      const updated = await Database.models.firm_task_template.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async update(data):Promise<any> {
    try {
      const updated = await Database.models.firm_task_template.update(data, {where: {id: data.id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async delete(id):Promise<any> {
    try {
      const deleted = await Database.models.firm_task_template.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    } catch (err) {
      console.error(err);
    }
  }

  public static async addTask(data):Promise<any> {
    try {
      const updated = await Database.models.firm_template_task.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async updateTask(data):Promise<any> {
    try {
      const updated = await Database.models.firm_template_task.update(data, {where: {id: data.id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async deleteTask(id):Promise<any> {
    try {
      const deleted = await Database.models.firm_template_task.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    } catch (err) {
      console.error(err);
    }
  }
}
