import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { TemplateTaskService } from '../services/template-task.service';
const passport = require('passport');

export class TemplateTaskController {
  constructor() {}


  public async create(req : Request, res: Response):Promise<any> {
    try {
      const created = await TemplateTaskService.create(req.body);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update(req : Request, res: Response):Promise<any> {
    try {
      const updated = await TemplateTaskService.update(req.body);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req : Request, res: Response):Promise<any> {
    try {
      const deleted = await TemplateTaskService.delete(req.body.params);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

}
