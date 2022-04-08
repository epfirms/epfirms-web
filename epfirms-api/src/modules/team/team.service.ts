import { Service } from 'typedi';
import { Database } from '@src/core/Database';

@Service()
export class TeamService {
  constructor() {}

  public async findOne(id: number): Promise<any> {
    const { firm_team } = Database.models;
    const team = await firm_team.findOne({
      where: {
        id,
      },
    });

    return Promise.resolve(team);
  }

  public async findAll(firmId: number): Promise<any> {
    const { firm_team } = Database.models;
    const teams = await firm_team.findAll({
      where: {
        firm_id: firmId,
      },
    });

    return Promise.resolve(teams);
  }

  public async create(firmId: number, teamDetails): Promise<any> {
    const { firm_team } = Database.models;
    const team = await firm_team.create({
      ...teamDetails,
      firm_id: firmId,
    });

    return Promise.resolve(team);
  }

  public async findAllByUserId(firmId: number, userId: number): Promise<any> {
    const { firm_employee, firm_team, firm_team_member } = Database.models;
    const employee = await firm_employee.findOne({where: {firm_id: firmId, user_id: userId}});
    const teams = await firm_team.findAll({
      include: [
        {
          model: firm_team_member,
          where: {
            firm_employee_id: employee.id,
          },
          required: true,
        }
      ]
    });


    return Promise.resolve(teams);
  }

  public async findAllMembers(teamId: number): Promise<any> {
    const { firm_team_member, firm_employee, user} = Database.models;
    const members = await firm_team_member.findAll({
      where: {
        firm_team_id: teamId
      },
      include: [{
        model: firm_employee,
        attributes: ['user_id'],
        include: [{
          model: user,
          attributes: ['first_name', 'last_name', 'profile_image']
        }]
      }]
    });

    return Promise.resolve(members);
  }

  public async updateMember(teamId: number, memberId: number, data): Promise<any> {
    const { firm_team_member } = Database.models;
    const members = await firm_team_member.update(data, {
      where: {
        id: memberId,
        firm_team_id: teamId
      }
    });

    return Promise.resolve(members);
  }
}
