
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { NonUserProfileService } from '@modules/non-user-profile/services/non-user-profile.service';
import { Service } from 'typedi';

@Service()
export class NonUserProfileController {
  constructor() {}

    public async create(req : Request, res : Response) : Promise<any> {
        try {
                const created = await NonUserProfileService.create(req.body);
                res.status(StatusConstants.CREATED).send(created);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }


    public async update(req : Request, res : Response) : Promise<any> {
        try {
                const updated = await NonUserProfileService.update(req.body);
                res.status(StatusConstants.CREATED).send(updated);
        }
        catch (error){

            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
  
    public async delete(req : Request, res : Response) : Promise<any> {
        try {

            const deleted = await NonUserProfileService.delete(req.params.id);
            res.status(StatusConstants.OK).send(true);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }

public async getOneWithId(req : Request, res : Response) : Promise<any> {
        try {

            const one = await NonUserProfileService.getOneWithId(req.params.id);
            res.status(StatusConstants.OK).send(one);
        }
        catch (error){
            res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
            console.error(error)
        }
    }
}


