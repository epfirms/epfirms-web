
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { SpecificRequestsService } from '@modules/specific-requests/services/specific-requests.service';
import { Service } from 'typedi';

@Service()
export class SpecificRequestsController {
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


