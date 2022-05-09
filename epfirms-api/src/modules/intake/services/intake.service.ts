
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class IntakeService {
     public static async upsert(data) : Promise<any> {
        try {

            const created = await Database.models.intake.upsert(data, {where: {id: data.id}});
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.intake.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getOneWithMatterId(id) : Promise<any> {
        try {

            const found = await Database.models.intake.findAll({where: {matter_id: id}});
            return Promise.resolve(found);
        }
        catch (error){
            console.error(error)
        }
    }
}



