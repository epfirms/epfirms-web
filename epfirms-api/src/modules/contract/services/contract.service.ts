
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class ContractService {
  
    public static async upsert(data) : Promise<any> {
        try {
            const created = await Database.models.contract.upsert(data);
            return Promise.resolve(created);
        } catch (error) {
            console.error(error);
        }

    }

    public static async getWithMatterId(id) : Promise<any> {
        try {
            const contract = await Database.models.contract.findOne({where: {matter_id: id}});
            return Promise.resolve(contract);
        } catch (error) {
            console.error(error);
        }
    }
}



