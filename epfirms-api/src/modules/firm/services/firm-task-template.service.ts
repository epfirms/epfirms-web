import { Database } from '@src/core/Database';

export class FirmTaskTemplateService {
  public static async get(firmId: number):Promise<any> {
    try {
      const { sequelize } = Database;
      const {firm_task_template, firm_template_task, user} = Database.models;

      const taskTemplates = await firm_task_template.findAll({where: {
        firm_id: firmId
      }, include: {
        model: firm_template_task,
        include: [
          {
            model: user
          },
        ],
      },
      order: [
        [
          sequelize.literal(
            '`firm_template_tasks`.no_of_days_from_start_date asc'
          )
        ]
      ]
    });
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

  public static async update(id: number, data):Promise<any> {
    try {
      const updated = await Database.models.firm_task_template.update(data, {where: {id}});
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

  public static async updateTask(id, changes):Promise<any> {
    try {
      const updated = await Database.models.firm_template_task.update(changes, {where: {id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public static async deleteTask(id):Promise<any> {
    try {
      const deleted = await Database.models.firm_template_task.destroy({where: {id: id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }
}
