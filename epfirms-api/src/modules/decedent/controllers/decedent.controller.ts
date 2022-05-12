
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { DecedentService } from '@modules/decedent/services/decedent.service';
import { Service } from 'typedi';

@Service()
export class DecedentController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await DecedentService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await DecedentService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getWithMatterId(req : Request, res : Response) : Promise<any> {
        try {

            const found = await DecedentService.getWithMatterId(req.params.matter_id);
            res.status(StatusConstants.OK).send(found);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


