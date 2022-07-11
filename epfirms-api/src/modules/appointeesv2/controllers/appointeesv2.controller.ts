
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Appointeesv2Service } from '@modules/appointeesv2/services/appointeesv2.service';
import { Service } from 'typedi';

@Service()
export class Appointeesv2Controller {
  constructor() {}

    public async create(req : Request, res : Response) : Promise<any> {
        try {
                const created = await Appointeesv2Service.create(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }


    public async update(req : Request, res : Response) : Promise<any> {
        try {
                const updated = await Appointeesv2Service.update(req.body);
                res.status(StatusConstants.CREATED).send(updated);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await Appointeesv2Service.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getOneWithId(req : Request, res : Response) : Promise<any> {
        try {

            const one = await Appointeesv2Service.getOneWithId(req.params.id);
            res.status(StatusConstants.OK).send(one);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


