import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { UserService } from '../user/services/user.service';
import { ConversationService } from './conversation.service';
import { transformAndValidate } from 'class-transformer-validator';
import { AddChatParticipantDto } from './dto';
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/service/conversation/participant';

@Service()
export class ChatController {
  constructor(
    private _conversationService: ConversationService,
    private _userService: UserService,
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
}
