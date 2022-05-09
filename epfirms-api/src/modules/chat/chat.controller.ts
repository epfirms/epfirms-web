import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { UserService } from '../user/services/user.service';
import { ConversationService } from './conversation.service';
import { transformAndValidate } from 'class-transformer-validator';
import { AddChatParticipantDto } from './dto';
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/service/conversation/participant';
import { MatterService } from '../matter/services/matter.service';
import { ConversationListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/service/conversation';
import { TeamService } from '../team/team.service';
import { FirmEmployeeService } from '../firm/services/firm-employee.service';

@Service()
export class ChatController {
  constructor(
    private _conversationService: ConversationService,
    private _userService: UserService,
    private _matterService: MatterService,
    private _teamService: TeamService,
    private _firmEmployeeService: FirmEmployeeService,
  ) {}

  public async getAccessToken(req, res) {
    try {
      const userId = req.user.id.toString();
      const chatGrant = await this._conversationService.createChatGrant();
      const accessToken = await this._conversationService.createAccessToken(userId, {
        chat: chatGrant,
      });

      res.status(StatusConstants.OK).send({ data: accessToken.toJwt() });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async createConversationsUser(req, res) {
    try {
      const { identity } = req.body;
      const user = await this._userService.get('id', parseInt(identity));
      const twilioUser = await this._conversationService.createUser(identity, user.full_name);

      res.status(StatusConstants.CREATED).send({ data: twilioUser });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async sendMessage(req, res) {
    try {
      const conversationSid = req.params.conversationSid;
      const messageOptions = req.body;
      const message = await this._conversationService.createMessage(
        conversationSid,
        messageOptions,
      );

      res.status(StatusConstants.CREATED).send({ data: message });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async addParticipant(req, res) {
    try {
      const requestBody: JSON = req.body;
      const conversationSid: string = req.params.conversationSid;
      const dto = await transformAndValidate(AddChatParticipantDto, requestBody);

      const participant: ParticipantInstance = await this._conversationService.addChatParticipant(
        conversationSid,
        dto,
      );

      res.status(StatusConstants.CREATED).send({ data: participant });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async deleteConversation(req, res) {
    try {
      const conversationSid = req.params.conversationSid;
      const deleted: boolean = await this._conversationService.deleteConversations(conversationSid);

      res.status(StatusConstants.CREATED).send({ data: deleted });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async getConversation(req, res) {
    try {
      const conversationSid = req.params.conversationSid;
      const conversation = await this._conversationService.fetchConversation(conversationSid);

      res.status(StatusConstants.CREATED).send({ data: conversation });
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async createConversationForMatter(req, res) {
    const firmId = req.user.firm_access.firm_id;
    const matterId = req.body.matter;
    let conversation;

    try {
      const matter = await this._matterService.getById(matterId);

      const opts: ConversationListInstanceCreateOptions = {
        attributes: JSON.stringify({
          type: 'group',
          matterId: matter.id,
        }),
      };

      conversation = await this._conversationService.createConversation(opts);

      const teams = await this._teamService.findAllByUserId(firmId, matter.attorney_id, {
        role: 'attorney',
      });

      if (!teams.length) {
      }
      const teamMembers = await this._teamService.findAllMembers(teams[0].id);
      const filteredMembers = teamMembers.filter((val, index, self) => self.findIndex(s => s.firm_employee_id === val.firm_employee_id) === index);
      const clientParticipant = await this._conversationService.addChatParticipant(
        conversation.sid,
        {
          messagingBinding: { address: matter.client.cell_phone },
          attributes: JSON.stringify({
            friendlyName: matter.client.full_name,
            phone: matter.client.cell_phone,
          }),
        },
      );
      for (let teamMember of filteredMembers) {
        const employee = await this._firmEmployeeService.getById(teamMember.firm_employee_id);
        if (
          teamMember.include_in_group_chat
        ) {
          await this._conversationService.addChatParticipant(conversation.sid, {
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
      if (conversation && conversation.sid) {
        await this._conversationService.deleteConversations(conversation.sid);
      }
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async findExistingConversation(req, res) {
    try {
      const firmId = req.user.firm_access.firm_id;
      const matterId = req.body.matter;
      const matter = await this._matterService.getById(matterId);
      const opts: ConversationListInstanceCreateOptions = {
        attributes: JSON.stringify({
          type: 'group',
          matterId: matter.id,
        }),
      };
      const conversation = await this._conversationService.createConversation(opts);
      const teams = await this._teamService.findAllByUserId(firmId, matter.attorney_id, {
        role: 'attorney',
      });

      if (!teams.length) {
      }
      const teamMembers = await this._teamService.findAllMembers(teams[0].id);
      const filteredMembers = teamMembers.filter((val, index, self) => self.findIndex(s => s.firm_employee_id === val.firm_employee_id) === index);
      const clientParticipant = await this._conversationService.addChatParticipant(
        conversation.sid,
        {
          messagingBinding: { address: matter.client.cell_phone },
          attributes: JSON.stringify({
            friendlyName: matter.client.full_name,
            phone: matter.client.cell_phone,
          }),
        },
      );
      for (let teamMember of filteredMembers) {
        const employee = await this._firmEmployeeService.getById(teamMember.firm_employee_id);
        if (
          teamMember.include_in_group_chat
        ) {
          await this._conversationService.addChatParticipant(conversation.sid, {
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
      console.log(error);
      console.error(error);
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
}
