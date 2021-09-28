import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { TaskTemplateService } from '../services/task-template.service';

const passport = require('passport');

export class TaskTemplateController {
  constructor() {}
  public async create(req : Request, res: Response):Promise<any> {
    try {
      const created = await TaskTemplateService.create(req.body);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update(req : Request, res: Response):Promise<any> {
    try {
      const updated = await TaskTemplateService.update(req.body);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req : Request, res: Response):Promise<any> {
    try {
      const deleted = await TaskTemplateService.delete(req.params.id);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }


}
