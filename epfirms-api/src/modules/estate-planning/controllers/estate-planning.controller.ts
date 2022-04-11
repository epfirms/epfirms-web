
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { EstatePlanningService } from '@modules/estate-planning/services/estate-planning.service';
import { Service } from 'typedi';

@Service()
export class EstatePlanningController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {

        }
        catch (error){
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

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


