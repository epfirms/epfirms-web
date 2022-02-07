import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class TaskService {
  /**
   * Returns all tasks for a firm w/ optional filters
   */
  public async getAll(firmId: number, filters: {assignee_id?: number} = {}): Promise<any> {
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
}
