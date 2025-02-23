
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { AppointeeService } from '@modules/appointee/services/appointee.service';
import { Service } from 'typedi';

@Service()
export class AppointeeController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {

            const appointee = await AppointeeService.upsert(req.body);
            res.status(StatusConstants.OK).send(appointee);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {
            const deleted = await AppointeeService.delete(req.params.id);
            res.status(StatusConstants.OK).send(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public async getAllWithId(req : Request, res : Response) : Promise<any> {
        try {

        }
        catch (error){
            console.error(error)
        }
    }
}


