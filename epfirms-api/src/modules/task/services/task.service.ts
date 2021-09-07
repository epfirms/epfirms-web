import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');

export class TaskService {
  public static async getTasks(userId: number): Promise<any> {
    const tasks = await Database.models.task.findAll({
      where: {
        user_id: userId
      }
    });

    return Promise.resolve(tasks);
  }

  public static async create(taskData): Promise<any> {
    const { matter_task } = Database.models;

    const createdTask = await matter_task.create(taskData);

    return Promise.resolve(createdTask);
  }

  public static async deleteTask(taskId: number): Promise<any> {
    const tasks = await Database.models.task.delete({
      where: {
        taskId
      }
    });

    return Promise.resolve(tasks);
  }

  public static async assignTask(taskId: number, task: any): Promise<any> {
    const tasks = await Database.models.task.update(task, {
      where: {
        task_id: taskId
      }
    });

    return Promise.resolve(tasks);
  }
}
