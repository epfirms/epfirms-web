import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { UserService } from '../user/services/user.service';
import { ConversationService } from './conversation.service';

@Service()
export class ChatController {
  constructor(private _conversationService: ConversationService, private _userService: UserService) {}

  public async getAccessToken(req, res) {
    try {
      const userId = req.user.id.toString();
      const chatGrant = await this._conversationService.createChatGrant();
      const accessToken = await this._conversationService.createAccessToken(userId, chatGrant);

      res.status(StatusConstants.OK).send({"data": accessToken.toJwt()});
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async createConversation(req, res) {
    try {
      const name = req.body.name;
      const conversationInstance = await this._conversationService.create(name);

      res.status(StatusConstants.CREATED).send(conversationInstance);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async getConversation(req, res) {
    try {
      const sid = req.params.sid;
      const conversationInstance = await this._conversationService.get(sid);

      res.status(StatusConstants.OK).send(conversationInstance);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async addParticipants(req, res) {
    try {
      const {participants} = req.body;
      const {conversationSid} = req.params;
      const {id} = req.user;
      // Default to self when no participants are included.
      if (!participants.length) {
        participants.push({identity: id});
      }
      const addedParticipants = await this._conversationService.addChatParticipants(conversationSid, participants);
      res.status(StatusConstants.OK).send(addedParticipants);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async addConversationMessage(req, res) {
    try {
      const { conversationSid } = req.params;
      const { body } = req.body;
      const { id } = req.user;

      const author = await this._userService.get('id', id);
      const message = await this._conversationService.addMessage(conversationSid, {author: author.full_name, body});

      res.status(StatusConstants.OK).send(message);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }

  public async getConversationMessages(req, res) {
    try {
      const {conversationSid} = req.params;
      const options = req.query;
      const messages = await this._conversationService.getMessages(conversationSid, options);

      res.status(StatusConstants.OK).send(messages);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({ message: error.message });
    }
  }
}
