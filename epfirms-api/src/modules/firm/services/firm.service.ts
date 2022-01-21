import { Database } from '@src/core/Database';
import { Service } from 'typedi';

export interface Firm {
  id: number;
  name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  county?: string;
  description?: string;
  website_url?: string;
  firm_image?: string;
  google_review_url?: string;
}

@Service()
export class FirmService {
  public async create(firmDetails): Promise<Firm> {
    const firm = await Database.models.firm.create(firmDetails);

    return Promise.resolve(firm);
  }

  /*
  getReviewURL()
        Inputs:
          id: The id of a specific firm.
        Outputs:
          google_review_url: The firm associated with the id's Google Review Page.
        Function:
          Finds the firm that matches the id, and returns the Google Review Page for that firm.
  */
  public async getReviewURL(id): Promise<any> {
    const firm = await Database.models.firm.findOne({ where: { id } });

    return Promise.resolve(await (firm.google_review_url));
  }

  public async getFirmName(id): Promise<any> {
    const firm = await Database.models.firm.findOne({ where: { id } });

    return Promise.resolve(await (firm.name));
  }

  public async get(id): Promise<any> {
    try {
      const firm = await Database.models.firm.findOne({ where: { id: id }});

      return Promise.resolve(firm);
    } catch (err) {
      console.error(err);
    }
  }

  public async createSubscription(id, customerId, currentPeriodEnd): Promise<string> {
    const current_period_end = new Date(currentPeriodEnd * 1000);

    const subscription = await Database.models.firm_subscription.create({
      customer_id: customerId,
      firm_id: id,
      current_period_end
    });

    return Promise.resolve(subscription);
  }

  public async getClients(firmId: number): Promise<any> {
    const { user, firm, client, matter, legal_area } = Database.models;
    const { sequelize } = Database;
    const clients = await user.findAll({
      include: [{
        model: firm,
        as: 'client_firm',
        // attributes: ['status'],
        required: true,
        through: {
          model: client,
          where: { firm_id: firmId },
          attributes: ['active', 'created_at'],
        }
      },
      {
        model: matter,
        as: 'client',
        required: false,
        where: {
          deleted: false,
          firm_id: firmId
        }
      }
    ]
    });

    return Promise.resolve(clients);
  }

  public async deleteClient(clientId, firmId): Promise<any> {
    const deletedClient = await Database.models.client.delete({
      where: {
        clientId,
        firmId
      }
    });

    return Promise.resolve(deletedClient);
  }

  public async createClient(clientInfo, firmId): Promise<any> {
      const result = await Database.sequelize.transaction(async (t) => {
        const firm = await Database.models.firm.findOne({
          where: {
            id: firmId
          }
        });
    
        let existingUser;
        if (clientInfo.email && clientInfo.email.length) {
          existingUser = await Database.models.user.findOne({
            where: {
              email: clientInfo.email
            }
          });
        }
    
        let firmClient;
        if (existingUser && existingUser.id) {
          firmClient = await firm.addFirm_client(existingUser, {transaction: t});
        } else {
          firmClient = await firm.createFirm_client(clientInfo, {transaction: t});
        }
    
        return firmClient;
      });

      return Promise.resolve(result);
  }

  public async updateFirm(firm_id, newFirmData) {
    try {
      const updatedFirm = await Database.models.firm.update(newFirmData, {
        where: { id: firm_id }
      });
      return Promise.resolve(updatedFirm);
    } catch (error) {
      console.error(error);
    }
  }
}
