
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { FinancialSummaryService } from '@modules/financial-summary/services/financial-summary.service';
import { Service } from 'typedi';

@Service()
export class FinancialSummaryController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await FinancialSummaryService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await FinancialSummaryService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getAllWithId(req : Request, res : Response) : Promise<any> {
        try {

            const all = await FinancialSummaryService.getAllWithId(req.params.id);
            res.status(StatusConstants.OK).send(all);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


