import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class FirmTeamService {
  public async getAllByFirmId(firmId: number): Promise<any> {
    const { firm, firm_employee, user, firm_role } = Database.models;
    const firmInstance = await firm.findByPk(firmId);
    const teams = await firmInstance.getFirm_teams({
      include: [
        {
          model: firm_employee,
          as: 'member',
          attributes: ['user_id'],
          include: [
            {
              model: user
            }
          ]
        }
      ]
    });
    return Promise.resolve(teams);
  }

  public async create(firmId: number, employeeId: number): Promise<any> {
    const { firm_employee } = Database.models;
    const firmInstance = await firm_employee.findByPk(employeeId);
    const employee = await firmInstance.createFirm_team({ firm_id: firmId });
    return Promise.resolve(employee.dataValues);
  }

  public async addMember(teamId: number, firmEmployeeId: number, roleId: number): Promise<any> {
    const { firm_team, firm_employee } = Database.models;
    console.log(roleId);
    console.log(firmEmployeeId);
    const teamInstance = await firm_team.findByPk(teamId);
    const employeeInstance = await firm_employee.findByPk(firmEmployeeId);
    if (teamInstance.firm_id === employeeInstance.firm_id) {
      await teamInstance.addMember(employeeInstance, {through: {firm_role_id: roleId}});
    } else {
      console.log(teamInstance.firm_id);
      console.log(employeeInstance.firm_id);
    }
    return Promise.resolve(true);
  }

  public async getMembersForTeam(teamId: number): Promise<any> {
    const { firm_team, firm_employee, firm_role } = Database.models;
    const firmTeamInstance = await firm_team.findOne({
      where: {
        id: teamId,
      },
      include: [
        {
          model: firm_employee,
        },
      ],
    });
    return Promise.resolve(firmTeamInstance);
  }
}
