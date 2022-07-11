
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class NonUserProfileService {
     public static async create(data) : Promise<any> {
        try {

            const created = await Database.models.non_user_profile.create(data);
            return Promise.resolve(created);
        }
        catch (error){
            console.error(error)
        }
    }
  
     public static async update(data) : Promise<any> {
        try {

            const updated = await Database.models.non_user_profile.update(data, { where: {id: data.id} });
            return Promise.resolve(updated);
        }
        catch (error){
            console.error(error)
        }
    }
    public static async delete(id) : Promise<any> {
        try {

            const deleted = await Database.models.non_user_profile.destroy({where: {id: id}});
            return Promise.resolve(deleted);
        }
        catch (error){
            console.error(error)
        }
    }

public static async getOneWithId(id) : Promise<any> {
        try {

            const one = await Database.models.non_user_profile.findOne({where: {id: id}});
            return Promise.resolve(one);
        }
        catch (error){
            console.error(error)
        }
    }
}



