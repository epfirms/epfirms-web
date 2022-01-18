
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class LegalInsuranceService {
  
    public static async upsert(data): Promise<any> {
        try {
            const created = await Database.models.legal_insurance.upsert(data, {where: {matter_id: data.matter_id}});
            return Promise.resolve(created);
        } catch (error) {
            console.error(error);
        }
    }
    
    public static async getWithMatterId(matterId): Promise<any> {
        try {
            const results = await Database.models.legal_insurance.findOne({where: {matter_id: matterId}});
            return Promise.resolve(results);
        } catch (error) {
            console.error(error);
        }
    }
}



