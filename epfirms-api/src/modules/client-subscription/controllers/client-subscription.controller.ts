
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { ClientSubscriptionService } from '@modules/client-subscription/services/client-subscription.service';
import { Service } from 'typedi';

@Service()
export class ClientSubscriptionController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await ClientSubscriptionService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await ClientSubscriptionService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getOneWithId(req : Request, res : Response) : Promise<any> {
        try {

            const one = await ClientSubscriptionService.getOneWithId(req.params.id);
            res.status(StatusConstants.OK).send(one);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


