import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class FirmTeamService {
  public async getAllByOwnerId(ownerId: number): Promise<any> {
    const { firm_employee, user, firm_team, firm_team_member } = Database.models;
    const employee = await firm_employee.findOne({where: {user_id: ownerId}});
    const teams = await firm_team.findAll({
      where: {
        owner: employee.id
      },
      include: [
        {
          model: firm_team_member,
          include: [{
            model: firm_employee,
            include: [{
              model: user
            }]
          }]
        }
      ]
    });


    return Promise.resolve(teams);
  }

  public async getAllByFirmId(firmId: number): Promise<any> {
    const { firm, firm_employee, user, firm_role, firm_team, firm_team_member } = Database.models;
    const teams = await firm_team.findAll({
      where: {
        firm_id: firmId
      },
      include: [
        {
          model: firm_team_member,
          include: [{
            model: firm_employee,
            include: [{
              model: user
            }]
          }]
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
    const { firm_team, firm_employee, firm_team_member } = Database.models;
    const teamInstance = await firm_team.findByPk(teamId);
    const employeeInstance = await firm_employee.findByPk(firmEmployeeId);
    if (teamInstance.firm_id === employeeInstance.firm_id) {
      await firm_team_member.create({firm_team_id: teamId, firm_employee_id: firmEmployeeId, firm_role_id: roleId});
    } else {
      console.log(teamInstance.firm_id);
      console.log(employeeInstance.firm_id);
    }
    return Promise.resolve(true);
  }

  public async removeMember(teamMemberId: number): Promise<any> {
    const { firm_team_member } = Database.models;
    await firm_team_member.destroy({where: {id: teamMemberId}});
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
