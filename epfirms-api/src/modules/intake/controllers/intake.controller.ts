
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { IntakeService } from '@modules/intake/services/intake.service';
import { Service } from 'typedi';

@Service()
export class IntakeController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await IntakeService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await IntakeService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getOneWithMatterId(req : Request, res : Response) : Promise<any> {
        try {

            const all = await IntakeService.getOneWithMatterId(req.params.matter_id);
            res.status(StatusConstants.OK).send(all);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


