import { Database } from '@src/core/Database';
const bcrypt = require('bcrypt');

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

export interface FirmEmployee extends FirmEmployeeRole {
  id?: number;
  firm_id: number;
  user_id: number;
}

export interface FirmEmployeeRole {
  admin: boolean;
  attorney: boolean;
  legal_assistant: boolean;
  paralegal: boolean;
}

export class FirmService {
  public static async create(firmDetails): Promise<Firm> {
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
  public static async getReviewURL(id): Promise<any> {
    const firm = await Database.models.firm.findOne({ where: { id } });

    return Promise.resolve(await (firm.google_review_url));
  }

  public static async getFirmName(id): Promise<any> {
    const firm = await Database.models.firm.findOne({ where: { id }, include: {model: Database.models.task_template, include: {model:Database.models.template_task}} });

    return Promise.resolve(await (firm.name));
  }

  public static async get(id): Promise<any> {
    try {
      const firm = await Database.models.firm.findOne({ where: { id: id } });

      return Promise.resolve(firm);
    } catch (err) {
      console.error(err);
    }
  }

  public static async createSubscription(id, customerId, currentPeriodEnd): Promise<string> {
    const current_period_end = new Date(currentPeriodEnd * 1000);

    const subscription = await Database.models.firm_subscription.create({
      customer_id: customerId,
      firm_id: id,
      current_period_end
    });

    return Promise.resolve(subscription);
  }

  public static async addEmployee(
    userId: number,
    firmId: number,
    roles: FirmEmployeeRole
  ): Promise<boolean> {
    let firmEmployee: FirmEmployee = {
      firm_id: firmId,
      user_id: userId,
      admin: false,
      attorney: false,
      legal_assistant: false,
      paralegal: false
    };

    firmEmployee = {
      ...firmEmployee,
      ...roles
    };

    const createEmployee = await Database.models.firm_employee.create(firmEmployee);

    return Promise.resolve(true);
  }

  public static async getClients(firmId: number): Promise<any> {
    const { user, firm, client, matter, legal_area } = Database.models;
    const { sequelize } = Database;
    const clients = await user.findAll({
      include: [{
        model: firm,
        // attributes: ['status'],
        required: true,
        through: {
          model: client,
          where: { firm_id: firmId },
          attributes: ['active', 'created_at'],
          as: 'FirmClient'
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

  public static async deleteClient(clientId, firmId): Promise<any> {
    const deletedClient = await Database.models.client.delete({
      where: {
        clientId,
        firmId
      }
    });

    return Promise.resolve(deletedClient);
  }

  public static async createClient(clientInfo, firmId): Promise<any> {
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

    let clientFirm;
    if (existingUser && existingUser.id) {
      clientFirm = await firm.addClientFirm(existingUser);
    } else {
      clientFirm = await firm.createClientFirm(clientInfo);
    }

    return Promise.resolve(clientFirm);
  }

  public static async getStaff(firmId): Promise<boolean> {
    const { user, firm, firm_employee } = Database.models;
    const staff = await user.findAll({
      include: {
        model: firm,
        required: true,
        attributes: ['id'],
        through: {
          model: firm_employee,
          where: { firm_id: firmId, active: true },
          attributes: ['admin', 'attorney', 'legal_assistant', 'paralegal']
        }
      }
    });

    // await firm.createClientFirm(fi);
    return Promise.resolve(staff);
  }

  public static async updateFirm(firm_id, newFirmData) {
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
