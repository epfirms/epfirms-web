import { Database } from '@src/core/Database';
import { Sequelize } from 'sequelize';
import { Service } from 'typedi';

@Service()
export class CaseTemplateCommunityService {
  public async getAllByFirmId(firmId: number):Promise<any> {
    try {
      const {community_case_template, community_template_task, community_template_task_file,community_template_task_sms_message, firm} = Database.models;

      const caseTemplates = await community_case_template.findAll({
        include: [{
        model: community_template_task,
        include: [
          {
            model: community_template_task_file,
          },
          {
            model: community_template_task_sms_message,
          }
        ],
      },
      {
        model: firm,
        where: {
          id: firmId
        },
        required: true
      }
    ],
      order: [
        [
          Sequelize.literal(
            '`community_template_tasks`.no_of_days_from_start_date asc'
          )
        ]
      ]
    });
      return Promise.resolve(caseTemplates);
    } catch (err) {
      console.error(err);
    }
  }
  public async getById(id: number):Promise<any> {
    try {
      const {community_case_template, community_template_task, community_template_task_file, community_template_task_sms_message, firm} = Database.models;

      const caseTemplates = await community_case_template.findOne({
        where: {
          id
        },
        include: [{
        model: community_template_task,
        include: [
          {
            model: community_template_task_file,
          },
          {
            model: community_template_task_sms_message
          }
        ],
      },
    ],
      order: [
        [
          Sequelize.literal(
            '`community_template_tasks`.no_of_days_from_start_date asc'
          )
        ]
      ]
    });
      return Promise.resolve(caseTemplates);
    } catch (err) {
      console.error(err);
    }
  }

  public async get(firmId: number):Promise<any> {
    try {
      const {community_case_template, community_template_task, community_template_task_file, community_template_task_sms_message, firm} = Database.models;

      const caseTemplates = await community_case_template.findAll({
        include: [{
        model: community_template_task,
        include: [
          {
            model: community_template_task_file,
          },
          {
            model: community_template_task_sms_message
          }
        ],
      }
    ],
      order: [
        [
          Sequelize.literal(
            '`community_template_tasks`.no_of_days_from_start_date asc'
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
      const updated = await Database.models.community_case_template.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async update(id: number, data):Promise<any> {
    try {
      const updated = await Database.models.community_case_template.update(data, {where: {id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async delete(id, firmId):Promise<any> {
    try {
      const deleted = await Database.models.community_case_template.destroy({where: {id: id, firm_id: firmId}});
      return Promise.resolve(deleted);
    } catch (err) {
      console.error(err);
    }
  }

  public async addTask(data):Promise<any> {
    try {
      const updated = await Database.models.community_template_task.create(data);
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateTask(id, changes):Promise<any> {
    try {
      const updated = await Database.models.community_template_task.update(changes, {where: {id}});
      return Promise.resolve(updated);
    } catch (err) {
      console.error(err);
    }
  }

  public async deleteTask(id):Promise<any> {
    try {
      const deleted = await Database.models.community_template_task.destroy({where: {id: id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }

  public async attachFileToTask(id: number, file: any):Promise<any> {
    try {
      const { community_template_task } = Database.models;
      const task = await community_template_task.findOne({where: {id}});
      const newFile = await task.createCommunity_template_task_file(file);

      return Promise.resolve(newFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateFileOnTask(id: number, changes: any):Promise<any> {
    try {
      const { community_template_task_file } = Database.models;
      const updatedFile = await community_template_task_file.update(changes, {where: {id}});
      return Promise.resolve(updatedFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeFileFromTask(id: number):Promise<any> {
    try {
      const { community_template_task_file } = Database.models;
      await community_template_task_file.destroy({where: {id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }


  public async createSmsAutomation(id: number, sms: any):Promise<any> {
    try {
      const { community_template_task } = Database.models;
      const task = await community_template_task.findOne({where: {id}});
      const taskSms = await task.createCommunity_template_task_sms_message(sms);

      return Promise.resolve(taskSms);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateSmsAutomation(id: number, changes: any):Promise<any> {
    try {
      const { community_template_task_sms_message } = Database.models;
      const updatedFile = await community_template_task_sms_message.update(changes, {where: {id}});
      return Promise.resolve(updatedFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeSmsAutomation(id: number):Promise<any> {
    try {
      const { community_template_task_sms_message } = Database.models;
      await community_template_task_sms_message.destroy({where: {id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }
}
