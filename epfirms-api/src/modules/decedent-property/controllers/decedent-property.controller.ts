
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { DecedentPropertyService } from '@modules/decedent-property/services/decedent-property.service';
import { Service } from 'typedi';

@Service()
export class DecedentPropertyController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await DecedentPropertyService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await DecedentPropertyService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getAllWithDecedentId(req : Request, res : Response) : Promise<any> {
        try {

            const all = await DecedentPropertyService.getAllWithDecedentId(req.params.decedent_id);
            res.status(StatusConstants.OK).send(all);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


