import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { InvoiceService } from '@modules/invoice/services/invoice.service';
import { Service } from 'typedi';

@Service()
export class InvoiceController {
  constructor() {}

  public async upsert(req: Request, res: Response): Promise<any> {
    try {
      const created = await InvoiceService.upsert(req.body);
      res.status(StatusConstants.CREATED).send(created);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const deleted = await InvoiceService.delete(req.params.id);
      res.status(StatusConstants.OK).send(true);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  public async getAllWithId(req: Request, res: Response): Promise<any> {
    try {
      const all = await InvoiceService.getAllWithId(req.params.id);
      res.status(StatusConstants.OK).send(all);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  public async getOneWithId(req: Request, res: Response): Promise<any> {
    try {
      const one = InvoiceService.getOneWithId(req.params.id);
      res.status(StatusConstants.OK).send(one);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

  // get all of the invoices for a firm
  public async getAllWithFirmId(req: Request, res: Response): Promise<any> {
    try {
      const all = await InvoiceService.getAllWithFirmId(req.params.id);
      res.status(StatusConstants.OK).send(all);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
      console.error(error);
    }
  }

}
