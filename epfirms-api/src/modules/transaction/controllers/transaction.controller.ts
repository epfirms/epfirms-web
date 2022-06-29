
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { TransactionService } from '@modules/transaction/services/transaction.service';
import { Service } from 'typedi';

@Service()
export class TransactionController {
  constructor() {}

    public async upsert(req : Request, res : Response) : Promise<any> {
        try {
                const created = await TransactionService.upsert(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await TransactionService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getOneWithId(req : Request, res : Response) : Promise<any> {
        try {

            const one = await TransactionService.getOneWithId(req.params.id);
            res.status(StatusConstants.OK).send(one);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


