import { Database } from '@src/core/Database';
import { Service } from 'typedi';

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
@Service()
export class FirmEmployeeService {
  constructor() {}
  /**
   * Get a single employee by user id
   *
   * @param userId
   * @returns Employee
   *
   */
     public async getByUserId(firmId: number, userId: number): Promise<any> {
      const { firm_employee, firm_role, user } = Database.models;
      const employeeInstance = await firm_employee.findOne({where: {
        firm_id: firmId,
        user_id: userId
      },        attributes: ['id', 'active', 'hourly_rate', 'admin'],
      include: [
        {
          model: firm_role,
          as: 'role',
          attributes: ['id', 'name']
        },
        {
          model: user
        }
      ]});
      return Promise.resolve(employeeInstance);
    }

  /**
   * Get all employees for a firm.
   *
   * @param firmId
   * @returns All employees
   *
   */
  public async getAll(firmId: number): Promise<boolean> {
    const { user, firm, firm_employee, firm_role } = Database.models;

    const staff = await firm.findOne({
      where: {
        id: firmId
      },
      include: {
        model: firm_employee,
        attributes: ['id', 'active', 'hourly_rate', 'admin'],
        include: [
          {
            model: firm_role,
            as: 'role',
            attributes: ['id', 'name']
          },
          {
            model: user
          }
        ]
      }
    });

    return Promise.resolve(staff.firm_employees);
  }

  public async add(firmId: number, employeeData): Promise<any> {
    const { firm, user } = Database.models;
    const firmInstance = await firm.findByPk(firmId);

    if (employeeData.user.email && employeeData.user.email.length) {
      const userInstance = await user.findOne({ where: { email: employeeData.user.email } });
      if (userInstance && userInstance.id) {
        await this._addFromExistingUser(firmInstance, userInstance);
        return Promise.resolve(userInstance.dataValues);
      }
    }

    const employee = await firmInstance.createEmployee(employeeData.user, {through: {hourly_rate: employeeData.hourly_rate}});
    return Promise.resolve(employee.dataValues);
  }

  public async setRoles(userId: number, roleIds: number[]): Promise<any> {
    const { user, firm_role } = Database.models;

    const userInstance = await user.findByPk(userId);
    const employerList = await userInstance.getEmployer();

    if (employerList.length) {
      const employeeInstance = employerList[0].firm_employee;
      const roleInstances = await firm_role.findAll({
        where: { id: roleIds, firm_id: employeeInstance.firm_id }
      });

      await employeeInstance.setRole(roleInstances);

      return Promise.resolve(roleInstances);
    }
  }

  public async update(id: number, data): Promise<any> {
    const { firm_employee } = Database.models;
    await firm_employee.update(data, {where: {id}});
    return Promise.resolve(true);
  }

  public async getById(id: number): Promise<any> {
    const { firm_employee, user } = Database.models;
    const employee = await firm_employee.findByPk(id, {
      include: [
        {model: user}
      ]
    });
    return Promise.resolve(employee);
  }

  private async _addFromExistingUser(firmInstance, userInstance) {
    const employerList = await userInstance.getEmployer();

    if (!employerList.length) {
      await firmInstance.addEmployee(userInstance);
      return Promise.resolve(true);
    }

    // TODO: Handle case where user already belongs to a firm

    return Promise.resolve(true);
  }
}
