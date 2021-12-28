import { Response, Request } from 'express';
import { Firm, FirmService } from '@modules/firm/services/firm.service';
import { PaymentProcessorService } from '@modules/payment-processor/services/payment-processor.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { UserService } from '@modules/user/services/user.service';
import { EmailsController } from '@modules/emails/controllers';
import { ClientSearchService } from '../services/client-search.service';
import { Service } from 'typedi';
import { FirmRoleService } from '../services/firm-role.service';
import { FirmEmployeeService } from '../services/firm-employee.service';
import { FirmTeamService } from '../services/firm-team.service';

@Service()
export class FirmController {
  constructor(
    private _clientSearchService: ClientSearchService,
    private _firmService: FirmService,
    private _userService: UserService,
    private _firmRoleService: FirmRoleService,
    private _firmEmployeeService: FirmEmployeeService,
    private _firmTeamService: FirmTeamService
  ) {}

  public async getFirm(req: any, resp: Response): Promise<any> {
    try {
      const firm_id = req.user.firm_access.firm_id;
      const firm = await this._firmService.get(firm_id);

      resp.status(StatusConstants.OK).send(firm);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async createFirm(req: Request, resp: Response): Promise<any> {
    try {
      const { user, firm, source } = req.body;

      const createdUser = await this._userService.create(user);

      const createdFirm: Firm = await this._firmService.create(firm);

      // await this._firmEmployeeService.add(createdUser.id, createdFirm.id, roles);

      const stripeCustomer = await PaymentProcessorService.createCustomer(user.email);

      // await Stripe.addPayment(stripeCustomer.id, source);

      const subscription = await PaymentProcessorService.subscribe(stripeCustomer.id);

      await this._firmService.createSubscription(
        createdFirm.id,
        subscription.customer,
        subscription.current_period_end
      );

      await this._firmRoleService.initDefault(createdFirm.id);
      
      resp.status(StatusConstants.CREATED).send({ success: true });

      EmailsController.sendFirmConfirmation(req, resp);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getClientList(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const clientList = await this._firmService.getClients(firm_id);

      resp.status(StatusConstants.OK).send(clientList);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createClient(req: any, resp: Response): Promise<any> {
    try {
      const { client } = req.body;
      const { firm_id } = req.user.firm_access;

      const newClient = await this._firmService.createClient(client, firm_id);
      resp.status(StatusConstants.CREATED).send(newClient);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getStaffList(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const staffList = await this._firmEmployeeService.getAll(firm_id);

      resp.status(StatusConstants.OK).send(staffList);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createStaffMember(req: any, resp: Response): Promise<any> {
    try {
      const { client } = req.body;
      const { firm_id } = req.user.firm_access;

      await this._firmService.createClient(client, firm_id);

      resp.status(StatusConstants.CREATED).send({ success: true });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async updateFirm(req: any, resp: Response): Promise<any> {
    try {
      const firm_id = req.params.id;
      const newFirmData = req.body;
      const updatedFirm = await this._firmService.updateFirm(firm_id, newFirmData);

      resp.status(StatusConstants.OK).send(updatedFirm);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getSearchKey(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const searchKey = await this._clientSearchService.generateClientSearchKey(parseInt(firm_id));

      resp.status(StatusConstants.OK).send({ key: searchKey });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getRoles(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const roles = await this._firmRoleService.get(parseInt(firm_id));

      resp.status(StatusConstants.OK).send({ roles: roles });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getTeams(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const teams = await this._firmTeamService.getAllByFirmId(firm_id);

      resp.status(StatusConstants.OK).send({ teams: teams });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getTeamsByOwner(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.params;

      const teams = await this._firmTeamService.getAllByOwnerId(id);

      resp.status(StatusConstants.OK).send({ teams: teams });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createTeam(req: any, resp: Response): Promise<any> {
    try {
      const { employeeId } = req.body;
      const { firm_id } = req.user.firm_access;

        // Create a team for attorney employees.
        const newTeam = await this._firmTeamService.create(firm_id, employeeId);

        // Add firm employee to team.
        await this._firmTeamService.addMember(newTeam.id, employeeId, 1);
      resp.status(StatusConstants.OK).send({ team: newTeam });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async addTeamMember(req: any, resp: Response): Promise<any> {
    try {
      const { employeeId, teamId, roleId } = req.body;

        // Add firm employee to team.
        const member = await this._firmTeamService.addMember(teamId, employeeId, roleId);

      resp.status(StatusConstants.OK).send({ member });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getTeamMembers(req: any, resp: Response): Promise<any> {
    try {
      const { teamId } = req.params;

        // Add firm employee to team.
        const members = await this._firmTeamService.getMembersForTeam(teamId);

      resp.status(StatusConstants.OK).send({ members });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
