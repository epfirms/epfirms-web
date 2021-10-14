import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Logger } from "@utils/logger/Logger";

export class MailchimpWebhookController {
  constructor() { }

  public async verifyEndpoint(req: any, resp: Response): Promise<any> {
    try {
      resp.status(StatusConstants.OK).send({status: "OK"});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createExternalLead(req: any, resp: Response): Promise<any> {
    try {
      const logger = Logger.getLogger();
      logger.info(req);

      resp.status(StatusConstants.OK).send({status: "Ok"});
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
