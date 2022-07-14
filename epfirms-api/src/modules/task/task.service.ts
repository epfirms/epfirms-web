import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class TaskService {
  /**
   * Returns all tasks for a firm w/ optional filters
   */
  public async getAll(firmId: number, filters: {assignee_id?: number} = {}): Promise<any> {
    const {matter_task, matter, matter_task_file, matter_task_sms_message} = Database.models;
    const tasks = await matter_task.findAll({
      where: filters,
      include: [
        {
          model: matter,
          where: {
            firm_id: firmId
          }
        },
        {
          model: matter_task_file
        },
        {
          model: matter_task_sms_message
        }
      ]
    });

    return Promise.resolve(tasks);
  }

  public async getOne(firmId: number, filters: {id?: number} = {}): Promise<any> {
    const {matter_task, matter_task_file, matter, matter_task_sms_message} = Database.models;
    const tasks = await matter_task.findOne({
      where: filters,
      include: [
        {
          model: matter,
          where: {
            firm_id: firmId
          }
        },
        {
          model: matter_task_file
        },
        {
          model: matter_task_sms_message
        }
      ]
    });

    return Promise.resolve(tasks);
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

  public async delete(firmId: number, filters: {assignee_id?: number} = {}): Promise<any> {
    const {matter_task, matter, user, legal_area} = Database.models;
    const tasks = await matter_task.findAll({
      where: filters,
      include: [
        {
          model: matter,
          where: {
            firm_id: firmId
          },
          include: [
            {
              model: user,
              as: 'client',
              required: true
            },
            {
              model: legal_area,
              as: 'legal_area'
            }
          ]
        },
      ]
    });

    return Promise.resolve(tasks);
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
}
