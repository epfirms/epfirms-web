
import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class ContractTemplateService {
  
    public static async upsert(data) : Promise<any> {
        try {
            const created = await Database.models.contract_template.upsert(data);
            return Promise.resolve(created);
        } catch (error) {
            console.error(error);
        }
    }

    public static async getAllWithFirmId(id) : Promise<any> {
        try {
            const templates = await Database.models.contract_template.findAll({where: {
                firm_id: id
            }});
            return Promise.resolve(templates);
        } catch (error) {
            console.error(error);
        }
    }

    public static async delete(id) : Promise<any> {
        try {
            
            const templates = await Database.models.contract_template.destroy({where: {
                id: id
            }});
            console.log("TEMPLATES SERVICE" , Promise.resolve(templates));
            return Promise.resolve(templates);
        } catch (error) {
            console.error(error);
        }
    }
}



