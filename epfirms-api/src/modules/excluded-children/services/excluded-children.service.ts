
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class ExcludedChildrenService {
     public static async upsert(data) : Promise<any> {
        try {

            const created = await Database.models.excluded_children.upsert(data, {where: {id: data.id}});
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.excluded_children.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getAllWithId(id) : Promise<any> {
        try {

            const all = await Database.models.excluded_children.findAll({where: {id: id}});
            return Promise.resolve(all);
        }
        catch (error){
            console.error(error)
        }
    }
}



