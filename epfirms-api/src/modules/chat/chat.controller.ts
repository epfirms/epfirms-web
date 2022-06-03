import { StatusConstants } from '@src/constants/StatusConstants';
import Container, { Service } from 'typedi';
import { UserService } from '../user/services/user.service';
import { transformAndValidate } from 'class-transformer-validator';
import { AddChatParticipantDto } from './dto';
import { MatterService } from '../matter/services/matter.service';
import { TeamService } from '../team/team.service';
import { FirmEmployeeService } from '../firm/services/firm-employee.service';
import { StripeMeteredUsageService } from '../stripe/services/stripe-metered-usage.service';
import { TwilioHelperLibraryService } from './twilio-helper-library.service';
import { TwilioSubaccountService, TWILIO_SUBACCOUNT_TOKEN } from './twilio-subaccount.service';
import { TwilioMainAccountService } from './twilio-main-account.service';
import { TwilioSubaccountCredentialsService } from './twilio-subaccount-credentials.service';
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/service/conversation/participant';
import { ConversationListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/service/conversation';
const { STRIPE_PRICE_MESSAGING_SMS, STRIPE_PRICE_MESSAGING_USER } = require('@configs/vars');

@Service()
export class ChatController {
  constructor(
    private _userService: UserService,
    private _matterService: MatterService,
    private _teamService: TeamService,
    private _firmEmployeeService: FirmEmployeeService,
    private _stripeMeteredUsageService: StripeMeteredUsageService,
    private _twilioMainAccountService: TwilioMainAccountService,
    private _twilioSubaccountCredentials: TwilioSubaccountCredentialsService,
  ) {}

  public async getAccessToken(req, res) {
    const requestScope = req.user.firm_access.firm_id;
    const userId = req.user.id.toString();

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountCredentials = scopedContainer.get(TWILIO_SUBACCOUNT_TOKEN);
      const subaccountInstance = await this._twilioMainAccountService.fetchSubaccount(
        subaccountCredentials.sid,
      );
      const twilioHelperService = scopedContainer.get(TwilioHelperLibraryService);
      const chatGrant = await twilioHelperService.createChatGrant();

      if (subaccountInstance.status === 'active') {
        const accessToken = await twilioHelperService.createAccessToken(userId, {
          chat: chatGrant,
        });

        res.status(StatusConstants.OK).send({ data: accessToken.toJwt() });
      } else {
        throw new Error('Subaccount is not active');
      }
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async createConversationsUser(req, res) {
    const requestScope = req.user.firm_access.firm_id;
    const { identity } = req.body;

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountService = scopedContainer.get(TwilioSubaccountService);
      const user = await this._userService.get('id', parseInt(identity));
      const twilioUser = await subaccountService.createUser(identity, user.full_name);

      res.status(StatusConstants.CREATED).send({ data: twilioUser });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async sendMessage(req, res) {
    const conversationSid = req.params.conversationSid;
    const messageOptions = req.body;
    const requestScope = req.user.firm_access.firm_id;

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountService = scopedContainer.get(TwilioSubaccountService);

      const message = await subaccountService.createMessage(conversationSid, messageOptions);

      res.status(StatusConstants.CREATED).send({ data: message });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async addParticipant(req, res) {
    const requestScope = req.user.firm_access.firm_id;
    const requestBody: JSON = req.body;
    const conversationSid: string = req.params.conversationSid;

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountService = scopedContainer.get(TwilioSubaccountService);

      const dto = await transformAndValidate(AddChatParticipantDto, requestBody);

      const participant: ParticipantInstance = await subaccountService.addChatParticipant(
        conversationSid,
        dto,
      );

      res.status(StatusConstants.CREATED).send({ data: participant });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async deleteConversation(req, res) {
    const requestScope = req.user.firm_access.firm_id;
    const conversationSid = req.body.conversationSid;

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountService = scopedContainer.get(TwilioSubaccountService);
      const deleted: boolean = await subaccountService.deleteConversations(conversationSid);

      res.status(StatusConstants.CREATED).send({ data: deleted });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async getConversation(req, res) {
    const requestScope = req.user.firm_access.firm_id;
    const conversationSid = req.params.conversationSid;

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountService = scopedContainer.get(TwilioSubaccountService);
      const conversation = await subaccountService.fetchConversation(conversationSid);

      res.status(StatusConstants.CREATED).send({ data: conversation });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async createConversationForMatter(req, res) {
    const firmId = req.user.firm_access.firm_id;
    const matterId = req.body.matter;
    let conversation;

    const requestScope = req.user.firm_access.firm_id;
    const scopedContainer = await this._createScopedContainer(requestScope);
    const subaccountService = scopedContainer.get(TwilioSubaccountService);
    try {
      const matter = await this._matterService.getById(matterId);

      const opts: ConversationListInstanceCreateOptions = {
        attributes: JSON.stringify({
          type: 'group',
          matterId: matter.id,
        }),
      };
      conversation = await subaccountService.createConversation(opts);

      const teams = await this._teamService.findAllByUserId(firmId, matter.attorney_id, {
        role: 'attorney',
      });

      if (!teams.length) {
      }
      const teamMembers = await this._teamService.findAllMembers(teams[0].id);
      const filteredMembers = teamMembers.filter(
        (val, index, self) =>
          self.findIndex((s) => s.firm_employee_id === val.firm_employee_id) === index,
      );
      for (let teamMember of filteredMembers) {
        const employee = await this._firmEmployeeService.getById(teamMember.firm_employee_id);
        if (teamMember.include_in_group_chat) {
          const participant = await subaccountService.addChatParticipant(conversation.sid, {
            identity: employee.user_id,
            messagingBinding: { projectedAddress: teams[0].twilio_phone_number },
            attributes: JSON.stringify({
              friendlyName: employee.user.first_name + ' ' + employee.user.last_name,
            }),
          });
        }
      }

      const clientParticipant = await subaccountService.addChatParticipant(conversation.sid, {
        messagingBinding: { address: matter.client.cell_phone },
        attributes: JSON.stringify({
          friendlyName: matter.client.full_name,
          phone: matter.client.cell_phone,
        }),
      });
      res.status(StatusConstants.CREATED).send({
        data: {
          conversationSid: conversation.sid,
        },
      });
    } catch (error) {
      if (conversation && conversation.sid) {
        await subaccountService.deleteConversations(conversation.sid);
      }
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async findExistingConversation(req, res) {
    const requestScope = req.user.firm_access.firm_id;

    try {
      const scopedContainer = await this._createScopedContainer(requestScope);
      const subaccountService = scopedContainer.get(TwilioSubaccountService);
      const firmId = req.user.firm_access.firm_id;
      const matterId = req.body.matter;
      const matter = await this._matterService.getById(matterId);
      const opts: ConversationListInstanceCreateOptions = {
        attributes: JSON.stringify({
          type: 'group',
          matterId: matter.id,
        }),
      };
      const conversation = await subaccountService.createConversation(opts);
      const teams = await this._teamService.findAllByUserId(firmId, matter.attorney_id, {
        role: 'attorney',
      });

      if (!teams.length) {
      }
      const teamMembers = await this._teamService.findAllMembers(teams[0].id);
      const filteredMembers = teamMembers.filter(
        (val, index, self) =>
          self.findIndex((s) => s.firm_employee_id === val.firm_employee_id) === index,
      );
      await subaccountService.addChatParticipant(conversation.sid, {
        messagingBinding: { address: matter.client.cell_phone },
        attributes: JSON.stringify({
          friendlyName: matter.client.full_name,
          phone: matter.client.cell_phone,
        }),
      });
      for (let teamMember of filteredMembers) {
        const employee = await this._firmEmployeeService.getById(teamMember.firm_employee_id);
        if (teamMember.include_in_group_chat) {
          await subaccountService.addChatParticipant(conversation.sid, {
            identity: employee.user_id,
            messagingBinding: { projectedAddress: teams[0].twilio_phone_number },
            attributes: JSON.stringify({
              friendlyName: employee.user.first_name + ' ' + employee.user.last_name,
            }),
          });
        }
      }
      res.status(StatusConstants.CREATED).send({
        data: {
          conversationSid: conversation.sid,
        },
      });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    } finally {
      Container.reset(requestScope);
    }
  }

  public async createSubscription(req, res) {
    try {
      const customer = req.body.customerId;
      const subscription = await this._stripeMeteredUsageService.createSubscription({
        customer,
        items: [{ price: STRIPE_PRICE_MESSAGING_SMS }, { price: STRIPE_PRICE_MESSAGING_USER }],
      });
      res.status(StatusConstants.CREATED).send({ data: { subscription } });
    } catch (err) {
      console.error(err.message);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: err.message });
    }
  }

  async handlePreEventWebhook(req, res) {
    try {
      console.log(req.body);
      const webhookBody = req.body;
      switch (webhookBody.EventType) {
        case 'onMessageAdd':
          await await this.preMessageAdd(webhookBody);
          break;
      }
      res.status(StatusConstants.OK).send({});
    } catch (error) {
      console.log(error);
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  async handlePostEventWebhook(req, res) {
    try {
      console.log(req.body);
      const webhookBody = req.body;
      switch (webhookBody.EventType) {
        case 'onMessageAdded':
          await this.postMessageAdd(webhookBody);
          break;
      }
      res.status(StatusConstants.OK).send({});
    } catch (error) {
      console.log(error);
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  private async preMessageAdd(data) {
    const twilioSubaccount = await this._twilioSubaccountCredentials.getTwilioSubaccount({
      account_sid: data.AccountSid,
    });
    const stripeCustomerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(
      twilioSubaccount.firm_id,
    );
    const hasFunds = await this._stripeMeteredUsageService.hasFundsForItem(
      stripeCustomerId,
      STRIPE_PRICE_MESSAGING_SMS,
    );

    if (hasFunds) {
      return Promise.resolve();
    } else {
      const account = await this._twilioMainAccountService.updateSubaccountStatus(
        data.AccountSid,
        'suspended',
      );
    }

    return Promise.reject(new Error('Pre-webhook error'));
  }

  private async postMessageAdd(data) {
    const twilioSubaccount = await this._twilioSubaccountCredentials.getTwilioSubaccount({
      account_sid: data.AccountSid,
    });

    if (twilioSubaccount && twilioSubaccount.firm_id) {
      const stripeCustomerId = await this._stripeMeteredUsageService.findCustomerIdByFirm(
        twilioSubaccount.firm_id,
      );

      if (stripeCustomerId) {
        const subscriptionItem = await this._stripeMeteredUsageService.getSubscriptionItemByPriceId(
          stripeCustomerId,
          STRIPE_PRICE_MESSAGING_SMS,
        );

        const currentTimestamp = Math.floor(Date.now() / 1000);
        await this._stripeMeteredUsageService.createUsageRecord(subscriptionItem.id, {
          quantity: 1,
          timestamp: currentTimestamp,
        });

        this.autoRecharge(stripeCustomerId);
      }
    }
    return Promise.resolve();
  }

  private async autoRecharge(customerId) {
    const customer = await this._stripeMeteredUsageService.fetchCustomer(customerId);
    const metadata = !customer.deleted ? customer['metadata'] : {};

    if (metadata && metadata.auto_recharge) {
      const currentBalance =
        (await this._stripeMeteredUsageService.getAdjustedCustomerBalance(customerId)) * -1;
      const autoRechargeTrigger = metadata.auto_recharge_trigger;
      if (currentBalance <= autoRechargeTrigger) {
        const amount = metadata.auto_recharge_amount - currentBalance;
        const paymentIntent = await this._stripeMeteredUsageService.createAutoRechargePaymentIntent(
          customerId,
          metadata.auto_recharge_payment_method,
          amount,
        );
        await this._stripeMeteredUsageService.creditCustomerBalance(
          customerId,
          paymentIntent.amount_received,
        );
      }
    }
  }

  private async _createScopedContainer(scope: string) {
    const credentialsService = Container.get(TwilioSubaccountCredentialsService);
    const subaccountCredentials = await credentialsService.getByFirmId(scope);
    Container.of(scope).set(TWILIO_SUBACCOUNT_TOKEN, subaccountCredentials);
    return Container.of(scope);
  }

  async TEST(req, res) {
    const firm = req.body.firm_id;
    const identity = req.body.identity;
    const scopedContainer = await this._createScopedContainer(firm);
    const subaccountService = scopedContainer.get(TwilioSubaccountService);
    const suba = await subaccountService.fetchConversationsByParticipantSid(identity);
    const cuba = await subaccountService.fetchParticipants(suba[0].conversationSid);
    res.status(StatusConstants.OK).send({b: suba, c: cuba});
  }

  async del(req,res) {
    const firm = req.body.firm_id;
    const identity = req.body.sid;
    const scopedContainer = await this._createScopedContainer(firm);
    const subaccountService = scopedContainer.get(TwilioSubaccountService);
    const del = await subaccountService.deleteConversations(identity);
    res.status(StatusConstants.OK).send({del});
  }
}
