
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class TransactionService {
     public static async upsert(data) : Promise<any> {
        try {

            const created = await Database.models.transaction.upsert(data, {where: {id: data.id}});
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.transaction.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getOneWithId(id) : Promise<any> {
        try {

            const one = await Database.models.transaction.findOne({where: {id: id}});
            return Promise.resolve(one);
        }
        catch (error){
            console.error(error)
        }
    }
}



