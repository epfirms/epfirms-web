import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { StatementService } from '../services/statement.service';

const passport = require('passport');

export class StatementController {
  constructor() {}
  public async create(req, res : Response) : Promise<any>{
    try {
      const created = await StatementService.create(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req, res : Response) : Promise<any>{
    try {
      const deleted = await StatementService.delete(req.params.id);
      res.status(StatusConstants.OK).send({success: "true"});
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
  public async update(req, res : Response) : Promise<any>{
    try {
      const updated = await StatementService.update(req.body);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      console.error(err);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }


}
