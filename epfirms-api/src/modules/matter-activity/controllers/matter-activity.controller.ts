import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterActivityService } from '../services/matter-activity.service';

const passport = require('passport');

export class MatterActivityController {
  constructor() {}

  public async create(req, res : Response) : Promise<any>{
    try {
      const created = await MatterActivityService.create(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
  public async getAllByMatterId(req, res : Response) : Promise<any>{
    try {
      const queried = await MatterActivityService.getAllByMatterId(req.params.matter_id);
      res.status(StatusConstants.OK).send(queried);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
  public async delete(req, res : Response) : Promise<any>{
    try {
      const deleted = await MatterActivityService.delete(req.params.id);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
  public async update(req, res : Response) : Promise<any>{
    try {
      const updated = await MatterActivityService.update(req.body);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
