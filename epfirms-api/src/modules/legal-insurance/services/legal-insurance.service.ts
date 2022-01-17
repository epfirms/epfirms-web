
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class LegalInsuranceService {
  
    public static async upsert(data): Promise<any> {
        try {
            const created = await Database.models.legal_insurance.upsert(data);
            return Promise.resolve(created);
        } catch (error) {
            console.error(error);
        }
    }
}



