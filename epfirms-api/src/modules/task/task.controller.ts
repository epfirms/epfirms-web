import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { TaskService } from './task.service';

@Service()
export class TaskController {
  constructor(private _taskService: TaskService) {}

  public async getAll(req, res) {
    try {
      const { id } = req.user;
      const { firm_id } = req.user.firm_access;
      const filters = req.query;
      // Assign current user as default.
      if (!filters.assignee_id) {
        filters.assignee_id = id;
      }
      const tasks = await this._taskService.getAll(firm_id, filters);
      res.status(StatusConstants.OK).send(tasks);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({"message": error.message});
    }
  }

  public async update(req, res) {
    try {
      const { id } = req.user;
      const { firm_id } = req.user.firm_access;
      const filters = req.query;
      // Assign current user as default
      if (!filters.assignee_id) {
        filters.assignee_id = id;
      }
      const tasks = this._taskService.getAll(firm_id, filters);
      return res.status(StatusConstants.OK).send(tasks);
    } catch (error) {
      return res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({"message": error.message});
    }
  }
}
