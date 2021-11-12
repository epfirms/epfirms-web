import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { FirmTaskTemplateService } from '../services/firm-task-template.service';

export class FirmTaskTemplateController {
  constructor() {}

  public async get(req : any, res: Response):Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const created = await FirmTaskTemplateService.get(firm_id);
      
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async create(req : any, res: Response):Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;
      let template = req.body;
      template.firm_id = firm_id;
      const created = await FirmTaskTemplateService.create(template);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update(req : Request, res: Response):Promise<any> {
    try {
      const { firm_task_template_id } = req.params;
      const changes = req.body;
      const updated = await FirmTaskTemplateService.update(parseInt(firm_task_template_id), changes);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req : Request, res: Response):Promise<any> {
    try {
      const { firm_task_template_id } = req.params;
      const deleted = await FirmTaskTemplateService.delete(firm_task_template_id);
      res.status(StatusConstants.OK).send({id: deleted});
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  public async addTask(req : Request, res: Response):Promise<any> {
    try {
      let task = req.body;
      task.template_id = parseInt(req.params.firm_task_template_id);
      const created = await FirmTaskTemplateService.addTask(task);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async updateTask(req : Request, res: Response):Promise<any> {
    try {
      const taskId = req.params.firm_template_task_id;
      const taskChanges = req.body;

      const updated = await FirmTaskTemplateService.updateTask(taskId, taskChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async deleteTask(req : Request, res: Response):Promise<any> {
    try {
      const { firm_template_task_id } = req.params;
      const deleted = await FirmTaskTemplateService.deleteTask(parseInt(firm_template_task_id));
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}