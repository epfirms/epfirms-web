import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class MatterTaskService {
  public async get(id: number): Promise<any> {
    const { matter_task } = Database.models;
    
    const matterTask = await matter_task.findByPk(id);

    return Promise.resolve(matterTask);
  }

  public async create(task): Promise<any> {
    const { matter_task } = Database.models;
    
    const newTask = await matter_task.create(task);

    return Promise.resolve(newTask);
  }

  public async update(task): Promise<any> {
    const updatedTask = await Database.models.matter_task.update(task, {where: {id: task.id}});

    return Promise.resolve(updatedTask);
  }

  public async delete(id): Promise<any> {
    const deletedTask = await Database.models.matter_task.destroy({ where: { id } });

    return Promise.resolve(deletedTask);
  }

  public async createSmsAutomation(id: number, sms: any):Promise<any> {
    try {
      const { matter_task } = Database.models;
      const task = await matter_task.findOne({where: {id}});
      const taskSms = await task.createMatter_task_sms_message(sms);

      return Promise.resolve(taskSms);
    } catch (err) {
      console.error(err);
    }
  }

  public async updateSmsAutomation(id: number, changes: any):Promise<any> {
    try {
      const { matter_task_sms_message } = Database.models;
      const updatedFile = await matter_task_sms_message.update(changes, {where: {id}});
      return Promise.resolve(updatedFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async removeSmsAutomation(id: number):Promise<any> {
    try {
      const { matter_task_sms_message } = Database.models;
      await matter_task_sms_message.destroy({where: {id}});
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }
}
