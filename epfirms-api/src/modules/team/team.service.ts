import { Service } from 'typedi';
import { Database } from '@src/core/Database';

@Service()
export class TeamService {
  constructor() {}

  public async findOne(id: number): Promise<any> {
    const { team } = Database.models;
    const teamInstance = await team.findOne({
      where: {
        id,
      },
    });

    return Promise.resolve(teamInstance);
  }

  public async findAll(firmId: number): Promise<any> {
    const { team } = Database.models;
    const teamInstances = await team.findAll({
      where: {
        firm_id: firmId,
      },
    });

    return Promise.resolve(teamInstances);
  }

  public async create(firmId: number, teamDetails): Promise<any> {
    const { team } = Database.models;
    const teamInstance = await team.create({
      ...teamDetails,
      firm_id: firmId,
    });

    return Promise.resolve(teamInstance);
  }

  public async findAllByEmployeeId(firmId: number, employeeId: number, opts: {role?: string} = {}): Promise<any> {
    const { firm_employee, team } = Database.models;

    const employee = await firm_employee.findByPk(employeeId, {
      include: [
        {
          model: team,
          where: {
            firm_id: firmId
          },
          through: {
            where: opts
          }
        }
      ]
    });

    return Promise.resolve(employee.teams);
  }

  public async findAllByUserId(firmId: number, userId: number, opts: {role?: string} = {}): Promise<any> {
    const { firm_employee, team } = Database.models;

    const employee = await firm_employee.findOne({
      where: {
        user_id: userId,
      },
      include: [
        {
          model: team,
          where: {
            firm_id: firmId,
          },
          through: {
            where: opts
          }
        }
      ]
    });

    if (employee) {
      return Promise.resolve(employee.teams);
    }

    return Promise.resolve([]);
  }

  public async findAllMembers(teamId: number): Promise<any> {
    const { team_member } = Database.models;
    const members = await team_member.findAll({
      where: {
        team_id: teamId
      }
    });

    return Promise.resolve(members);
  }

  public async updateMember(teamId: number, memberId: number, data): Promise<any> {
    const { team_member } = Database.models;
    const members = await team_member.update(data, {
      where: {
        id: memberId,
        team_id: teamId
      }
    });

    return Promise.resolve(members);
  }

  public async addEmployeeToTeam(teamId: number, employeeId: number, role: string): Promise<any> {
    const { team, firm_employee, team_member } = Database.sequelize.models;
    const teamInstance: any = await team.findByPk(teamId);
    const employeeInstance: any = await firm_employee.findByPk(employeeId);
    const teamMember = await team_member.create({
      team_id: teamInstance.id,
      firm_employee_id: employeeInstance.id,
      role
    });

    return Promise.resolve(teamMember);
  }

  public async removeEmployeeFromTeam(teamId: number, memberId: number, role: string): Promise<any> {
    const { team_member } = Database.sequelize.models;
    await team_member.destroy({where: {
      team_id: teamId,
      firm_employee_id: memberId,
      role
    }});
    return Promise.resolve(true);
  }
}
