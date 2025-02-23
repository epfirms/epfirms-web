
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { IncomeService } from '@modules/income/services/income.service';
import { Service } from 'typedi';

@Service()
export class IncomeController {
  constructor() {}

  public async upsert(req, res : Response) : Promise<any> {
    try {
      const income = await IncomeService.upsert(req.body);
      res.status(StatusConstants.OK).send(income)
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  } 

  public async getWithUserId(req, res : Response) : Promise<any> {
    try {
      const incomes = await IncomeService.getWithUserId(req.params.user_id);
      console.log("CONTROLLER BACKEND", incomes);
      res.status(StatusConstants.OK).send(incomes);
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  } 
  public async delete(req, res : Response) : Promise<any> {
    try {
      const income = await IncomeService.delete(req.params.id);
      res.status(StatusConstants.OK).send({deleted: true})
    } catch (error) {
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}


