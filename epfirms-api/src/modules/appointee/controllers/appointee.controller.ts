import { Response, Request } from 'express';
import { AppointeeService } from '@modules/appointee/services/appointee.service';
import { StatusConstants } from '@src/constants/StatusConstants';

export class AppointeeController {
  constructor() {}

  //:user_id getAppointeeForUser
  //:user_id?ranks getMaxRanksforUser
  //:member_id?table_link getAppointeeByLookupId
  public async getAppointee(req: Request, resp: Response): Promise<any> {
    try {
      let { id } = req.params;
      const { ranks, table_link } = req.query;
      let response;

      if (!(ranks || table_link)) {
        response = await AppointeeService.getByUserId(id);
      } else if (req.query.ranks === 'max') {
        response = await AppointeeService.getMaxRanksByUserId(id);
      } else if (req.query.table_link) {
        response = await AppointeeService.getByLookupTable(id, req.query.table_link);
      }

      resp.status(StatusConstants.OK).send(response);
    } catch (err) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //:id upsertAppointee
  public async createAppointee(req: Request, resp: Response): Promise<any> {
    try {
      if (!req.body) {
        throw new Error('appointee data is required');
      }

      let response = await AppointeeService.upsert(req.body);
      resp.status(StatusConstants.OK).send(response);
    } catch (err) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //:id — editAppointee
  //:id?lookup_id=“”&table_link=“”&relationship=“” — AppointeeController.editAppointeeByLookupID
  public async patchService(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { lookup_id, table_link, relationship } = req.query;
      if (!id) {
        throw new Error('appointee id is required');
      }
      let response;

      if (lookup_id && table_link && relationship) {
        response = await AppointeeService.modifyByLookupTable(
          id,
          lookup_id,
          table_link,
          relationship
        );
      } else {
        response = await AppointeeService.modify(req.body);
      }

      resp.status(StatusConstants.OK).send(response);
    } catch (err) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  //:id — AppointeeController.remove
  //:id?table_link&member_id — AppointeeController.deleteAppointeeByLookupId
  public async deleteService(req: Request, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { lookup_id, table_link } = req.query;

      let response;

      if (lookup_id && table_link) {
        response = await AppointeeService.deleteByLookupTable(id, lookup_id, table_link);
      } else {
        response = await AppointeeService.delete(req.body);
      }

      resp.status(StatusConstants.OK).send(response);
    } catch (err) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
