
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class DecedentPropertyService {
     public static async upsert(data) : Promise<any> {
        try {

            const created = await Database.models.decedent_property.upsert(data, {where: {id: data.id}});
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.decedent_property.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getAllWithDecedentId(id) : Promise<any> {
        try {

            const all = await Database.models.decedent_property.findAll({where: {decedent_id: id}});
            return Promise.resolve(all);
        }
        catch (error){
            console.error(error)
        }
    }
}



