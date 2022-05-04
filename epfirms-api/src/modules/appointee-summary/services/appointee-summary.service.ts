
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class AppointeeSummaryService {
     public static async upsert(data) : Promise<any> {
        try {

            const created = await Database.models.appointee_summary.upsert(data, {where: {id: data.id}});
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.appointee_summary.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getWithUserId(userID) : Promise<any> {
        try {

            const foundOne = await Database.models.appointee_summary.findOne({where: {user_id: userID}});
            return Promise.resolve(foundOne);
        }
        catch (error){
            console.error(error)
        }
    }
}



