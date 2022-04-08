
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class IncomeService {
 public static async upsert(data) : Promise<any> {
     try {
         const income = await Database.models.income.upsert(data, {where: {id: data.id}});
         return Promise.resolve(income);
     } catch (error) {
        console.error(error); 
     }
 } 

 public static async getWithUserId(userID) : Promise<any> {
     try {
         const incomes = await Database.models.income.findAll({where: {user_id: userID}});
         console.log("BACKEND SERVICE", incomes);
         return Promise.resolve(incomes);
     } catch (error) {
        console.error(error); 
     }
 } 
}



