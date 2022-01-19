
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class CustomerAccountService {
  

    public static async upsert(data) : Promise<any> {
        try {
            const created = await Database.models.customer_account.upsert(data);
            return Promise.resolve(created);
        } catch (error) {
            console.error(error);
        }
    }

    public static async getWithMatterId(matterId) : Promise<any> {
        try {
            const account = await Database.models.customer_account.findOne({where:{matter_id: matterId}});
            return Promise.resolve(account);
        } catch (error) {
            console.error(error);
        }
    }
}



