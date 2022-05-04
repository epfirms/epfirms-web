import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';

@Service()
export class TeamMemberController {
  constructor() {}

  public async getAll(req, res) {
    // try {
    //   const firmId = req.user.firm_access.firm_id;
    //   const teams = await this.teamService.findAll(firmId);

    //   res.status(StatusConstants.OK).send({ data: teams });
    // } catch (error) {
    //   res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    // }
  }
}
