
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class EstatePlanningService {
     public static async upsert(data) : Promise<any> {
        try {

            console.log("DATA", data);
            const created = await Database.models.estate_planning.upsert(data, {where: {id: data.id}});
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.estate_planning.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getAllWithId(id) : Promise<any> {
        try {

            const all = await Database.models.estate_planning.findAll({where: {matter_id: id}});
            return Promise.resolve(all);
        }
        catch (error){
            console.error(error)
        }
    }
}



