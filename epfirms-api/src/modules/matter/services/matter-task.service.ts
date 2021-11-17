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
}
