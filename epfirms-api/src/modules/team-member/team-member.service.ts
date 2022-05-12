import { Service } from 'typedi';
import { Database } from '@src/core/Database';

@Service()
export class TeamMemberService {
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
}
