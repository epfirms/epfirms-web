import { Response, Request } from 'express';
import { Firm, FirmService } from '@modules/firm/services/firm.service';
import { PaymentProcessorService } from '@modules/payment-processor/services/payment-processor.service';
import { StatusConstants } from '@src/constants/StatusConstants';
import { UserService } from '@modules/user/services/user.service';
import { EmailsController } from '@modules/emails/controllers';

const passport = require('passport');

export class FirmController {
  constructor() { }

  public async getFirm(req: any, resp: Response): Promise<any> {
    try {
      const firm_id = req.user.firm_access.firm_id;
      const firm = await FirmService.get(firm_id);

      resp.status(StatusConstants.OK).send(firm);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async createFirm(req: Request, resp: Response): Promise<any> {
    try {
      const { user, firm, source } = req.body;

      const createdUser = await UserService.create(user);

      const createdFirm: Firm = await FirmService.create(firm);

      const roles = {
        admin: true,
        attorney: true,
        legal_assistant: false,
        paralegal: false
      };

      await FirmService.addEmployee(createdUser.id, createdFirm.id, roles);

      const stripeCustomer = await PaymentProcessorService.createCustomer(user.email);

      // await Stripe.addPayment(stripeCustomer.id, source);

      const subscription = await PaymentProcessorService.subscribe(stripeCustomer.id);

      await FirmService.createSubscription(createdFirm.id, subscription.customer, subscription.current_period_end);

      resp.status(StatusConstants.CREATED).send({success: true});

      EmailsController.sendFirmConfirmation(req, resp);


    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getClientList(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const clientList = await FirmService.getClients(firm_id);

      resp.status(StatusConstants.OK).send(clientList);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createClient(req: any, resp: Response): Promise<any> {
    try {
      const { client } = req.body;
      const { firm_id } = req.user.firm_access;

      const newClient = await FirmService.createClient(client, firm_id);

      resp.status(StatusConstants.CREATED).send(newClient);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async getStaffList(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const staffList = await FirmService.getStaff(firm_id);

      resp.status(StatusConstants.OK).send(staffList);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async createStaffMember(req: any, resp: Response): Promise<any> {
    try {
      console.log(req.body)
      const user = req.body;
      console.log(user)
      const { firm_id } = req.user.firm_access;
      const createdUser = await UserService.create(user);

      const roles = {
        admin: user.admin,
        attorney: user.attorney,
        legal_assistant: user.legal_assistant,
        paralegal: user.paralegal
      };

      await FirmService.addEmployee(createdUser.id, firm_id, roles);
      resp.status(StatusConstants.OK).send();
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async deleteStaffMember(req: any, resp: Response): Promise<any> {
    console.log("I MADE IT HERE")
    try {
      console.log(req.body)
      const staff = req.body;
      console.log(staff)
      const { firm_id } = req.user.firm_access;
      await FirmService.deleteEmployee(staff, firm_id);
      console.log("DELETED, we good.")
      resp.status(StatusConstants.OK).send();
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async updateFirm(req: any, resp: Response): Promise<any> {
    try {
      const firm_id = req.params.id;
      const newFirmData = req.body;
      const updatedFirm = await FirmService.updateFirm(firm_id, newFirmData);

      resp.status(StatusConstants.OK).send(updatedFirm);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
