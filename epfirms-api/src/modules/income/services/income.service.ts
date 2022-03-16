
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class IncomeService {
 public static async upsert(data) : Promise<any> {
     try {
         const income = await Database.models.income.upsert(data, {where: {id: data.id}});
         Promise.resolve(income);
     } catch (error) {
        console.error(error); 
     }
 } 
}



