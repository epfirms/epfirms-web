import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { MatterTaskService } from '../services/matter-task.service';

export class MatterTaskController {
  constructor() {}

  public async createTask(req: any, resp: Response): Promise<any> {
    try {
      const task = req.body;

      const newTask = await MatterTaskService.create(task);

      const matter = await MatterService.getOne(newTask.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async updateTask(req: any, resp: Response): Promise<any> {
    try {
      const task = req.body;

      const updatedTask = await MatterTaskService.update(task);

      const matter = await MatterService.getOne(task.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async deleteTask(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.body;

      const matterTask = await MatterTaskService.get(id);

      const deletedTask = await MatterTaskService.delete(id);

      const matter = await MatterService.getOne(matterTask.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
