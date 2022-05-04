
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { AppointeeSummaryService } from '@modules/appointee-summary/services/appointee-summary.service';
import { Service } from 'typedi';

@Service()
export class AppointeeSummaryController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await AppointeeSummaryService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await AppointeeSummaryService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getWithUserId(req : Request, res : Response) : Promise<any> {
        try {

            const all = await AppointeeSummaryService.getWithUserId(req.params.user_id);
            res.status(StatusConstants.OK).send(all);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


