
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class AppointeeService {
     public static async upsert(data) : Promise<any> {
        try {

            const appointee = await Database.models.appointee.upsert(data);
            return Promise.resolve(appointee);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

        }
        catch (error){
            console.error(error)
        }
    }

public static async getAllWithId(id) : Promise<any> {
        try {

        }
        catch (error){
            console.error(error)
        }
    }
}



