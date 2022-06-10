import { Database } from '@src/core/Database';
import { Sequelize } from 'sequelize';
import { Service } from 'typedi';

@Service()
export class FirmCaseTemplateService {
  public async getOne(templateId: number):Promise<any> {
    try {
      const {firm_case_template, firm_template_task, firm_template_task_file, user} = Database.models;

      const template = await firm_case_template.findOne({where: {
        id: templateId,
      }, include: {
        model: firm_template_task,
        include: [
          {
            model: user
          },
          {
            model: firm_template_task_file,
          }
        ],
      },
      order: [
        [
          Sequelize.literal(
            '`firm_template_tasks`.no_of_days_from_start_date asc'
          )
        ]
      ]
    });
      return Promise.resolve(template);
    } catch (err) {
      console.error(err);
    }
  }

  public async get(firmId: number):Promise<any> {
    try {
      const {firm_case_template, firm_template_task, firm_template_task_file, user} = Database.models;

      const caseTemplates = await firm_case_template.findAll({where: {
        firm_id: firmId
      }, include: {
        model: firm_template_task,
        include: [
          {
            model: user
          },
          {
            model: firm_template_task_file,
          }
        ],
      },
      order: [
        [
          Sequelize.literal(
            '`firm_template_tasks`.no_of_days_from_start_date asc'
          )
        ]
      ]
    });
      return Promise.resolve(caseTemplates);
    } catch (err) {
      console.error(err);
    }
  }

  public async create(data):Promise<any> {
    try {
      const updated = await Database.models.firm_case_template.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async update(id: number, data):Promise<any> {
    try {
      const updated = await Database.models.firm_case_template.update(data, {where: {id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async delete(id):Promise<any> {
    try {
      const deleted = await Database.models.firm_case_template.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    } catch (err) {
      console.error(err);
    }
  }

  public async addTask(data):Promise<any> {
    try {
      const updated = await Database.models.firm_template_task.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateTask(id, changes):Promise<any> {
    try {
      const updated = await Database.models.firm_template_task.update(changes, {where: {id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteTask(id):Promise<any> {
    try {
      const deleted = await Database.models.firm_template_task.destroy({where: {id: id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }

  public async attachFileToTask(id: number, file: any):Promise<any> {
    try {
      const { firm_template_task } = Database.models;
      const task = await firm_template_task.findOne({where: {id}});
      const newFile = await task.createFirm_template_task_file(file);

      return Promise.resolve(newFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateFileOnTask(id: number, changes: any):Promise<any> {
    try {
      const { firm_template_task_file } = Database.models;
      const updatedFile = await firm_template_task_file.update(changes, {where: {id}});
      return Promise.resolve(updatedFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeFileFromTask(id: number):Promise<any> {
    try {
      const { firm_template_task_file } = Database.models;
      await firm_template_task_file.destroy({where: {id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }
}
