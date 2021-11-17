import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { MatterTaskService } from '../services/matter-task.service';
import { Service } from 'typedi';

@Service()
export class MatterTaskController {
  constructor(
    private _matterService: MatterService,
    private _matterTaskService: MatterTaskService
  ) {}

  public async createTask(req: any, resp: Response): Promise<any> {
    try {
      const task = req.body;

      const newTask = await this._matterTaskService.create(task);

      const matter = await this._matterService.getOne(newTask.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async updateTask(req: any, resp: Response): Promise<any> {
    try {
      const task = req.body;

      const updatedTask = await this._matterTaskService.update(task);

      const matter = await this._matterService.getOne(task.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async deleteTask(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.body;

      const matterTask = await this._matterTaskService.get(id);

      const deletedTask = await this._matterTaskService.delete(id);

      const matter = await this._matterService.getOne(matterTask.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
