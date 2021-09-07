import { Response, Request } from 'express';
import { TaskService } from '@modules/task/services/task.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@src/modules/matter/services/matter.service';
const passport = require('passport');

export class TaskController {
  constructor() {}

  public async getTasks(req: any, resp: Response): Promise<any> {
    try {
      const { user } = req.params;

      let id;

      if (user === "current") {
        id = req.user.id
      }

      const tasks = await TaskService.getTasks(id);

      resp.status(StatusConstants.OK).send(tasks);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
  
  public async createTask(req: any, resp: Response): Promise<any> {
    try {
      const { task } = req.body;
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async assignTask(req: any, resp: Response): Promise<any> {
    try {
      const { user } = req.params;

      let id;

      if (user === "current") {
        id = req.user.id
      }

      const tasks = TaskService.getTasks(id);

      resp.status(StatusConstants.OK).send(user);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async deleteTask(req: any, resp: Response): Promise<any> {
    try {
      const { user } = req.params;

      let id;

      if (user === "current") {
        id = req.user.id
      }

      const tasks = TaskService.getTasks(id);

      resp.status(StatusConstants.OK).send(user);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
