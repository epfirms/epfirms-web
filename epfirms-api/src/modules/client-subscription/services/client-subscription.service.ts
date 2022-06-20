import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class ClientSubscriptionService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.client_subscription.upsert(data, {
        where: { id: data.id },
      });
      return Promise.resolve(created);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id): Promise<any> {
    try {
      const deleted = await Database.models.client_subscription.destroy({ where: { id: id } });
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getOneWithId(id): Promise<any> {
    try {
      const one = await Database.models.client_subscription.findOne({ where: { id: id } });
      return Promise.resolve(one);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getAllWithFirmId(firmId): Promise<any> {
    try {
      const clientSubscriptions = await Database.models.client_subscription.findAll({
        where: { firm_id: firmId },
        include: [
            {
                model: Database.models.user,
            },
        ],
      });
      return Promise.resolve(clientSubscriptions);
    } catch (error) {
      console.error(error);
    }
  }
}
