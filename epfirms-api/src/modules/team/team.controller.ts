import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { TeamService } from './team.service';

@Service()
export class TeamController {
  constructor(private teamService: TeamService) {}

  public async getAll(req, res) {
    try {
      const firmId = req.user.firm_access.firm_id;
      const teams = await this.teamService.findAll(firmId);

      res.status(StatusConstants.OK).send({ data: teams });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async getOne(req, res) {
    try {
      const teamId = req.params.id;
      const team = await this.teamService.findOne(teamId);

      res.status(StatusConstants.OK).send({ data: team });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async create(req, res) {
    try {
      const { firm_id } = req.user.firm_access;
      const teamDetails = req.body;
      const team = await this.teamService.create(firm_id, teamDetails);

      res.status(StatusConstants.CREATED).send({ data: team });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async addEmployee(req, res) {
    try {
      const teamIdentifier = req.params.id;
      const employeeIdentifier = req.body.employee;
      const role = req.body.role;
      const member = await this.teamService.addEmployeeToTeam(teamIdentifier, employeeIdentifier, role);
      res.status(StatusConstants.OK).send({ data: member });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async removeEmployee(req, res) {
    try {
      const teamIdentifier = req.params.id;
      const employeeIdentifier = req.params.employeeId;
      const role = req.body.role;
      const isRemoved = await this.teamService.removeEmployeeFromTeam(teamIdentifier, employeeIdentifier, role);
      res.status(StatusConstants.OK).send({ data: {removed: isRemoved} });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async getMembers(req, res) {
    try {
      const teamId = req.params.id;
      const members = await this.teamService.findAllMembers(teamId);
      res.status(StatusConstants.OK).send({ data: members });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async updateMember(req, res) {
    try {
      const teamId = parseInt(req.params.id);
      const memberId = parseInt(req.params.member_id);
      const data = req.body;

      const members = await this.teamService.updateMember(teamId, memberId, data);
      res.status(StatusConstants.OK).send({ data: {updated: "true"} });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
}
