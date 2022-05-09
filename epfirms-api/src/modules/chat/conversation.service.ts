import { Service } from 'typedi';
import twilio = require('twilio');
import AccessToken = require('twilio/lib/jwt/AccessToken');
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/service/conversation/participant';
import { LocalInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumber/local';
import { AccountInstance } from 'twilio/lib/rest/api/v2010/account';
import { AddChatParticipantDto } from './dto';
import { UserInstance } from 'twilio/lib/rest/conversations/v1/service/user';
import {
  MessageInstance,
  MessageListInstanceCreateOptions,
} from 'twilio/lib/rest/conversations/v1/service/conversation/message';
import { ConversationListInstanceCreateOptions } from 'twilio/lib/rest/conversations/v1/conversation';
import { ConversationInstance } from 'twilio/lib/rest/conversations/v1/service/conversation';
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET,
  TWILIO_CONVERSATIONS_SERVICE_SID,
} = require('@configs/vars');

/**
 * Handles chat-to-chat capabilities.
 */
@Service()
export class ConversationService {
  twilioClient: twilio.Twilio;

  constructor() {
    this.twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  }

  /**
   * Creates a grant for a client to use Chat as a given user, on a given device.
   */
  async createChatGrant(): Promise<AccessToken.ChatGrant> {
    const chatGrant = new AccessToken.ChatGrant({
      serviceSid: TWILIO_CONVERSATIONS_SERVICE_SID,
    });

    return Promise.resolve(chatGrant);
  }

  /**
   * Creates an access token for use with twilio SDK client.
   */
  async createAccessToken(
    identity: string,
    grants: {
      chat: AccessToken.ChatGrant;
    },
  ): Promise<AccessToken> {
    const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
      identity: identity,
      ttl: 43200,
    });

    token.addGrant(grants.chat);
    return Promise.resolve(token);
  }

  async createConversation(opts: ConversationListInstanceCreateOptions): Promise<ConversationInstance> {
    const conversation = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .conversations.create(opts);

    return Promise.resolve(conversation);
  }

  async createMessage(
    conversationSid: string,
    opts: MessageListInstanceCreateOptions,
  ): Promise<MessageInstance> {
    const message = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .conversations(conversationSid)
      .messages.create(opts);

    return Promise.resolve(message);
  }

  async createUser(identity: string, friendlyName: string): Promise<any> {
    const user = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .users.create({ identity, friendlyName });
    return Promise.resolve(user);
  }

  async fetchUser(userSid: string): Promise<UserInstance> {
    const user = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .users(userSid)
      .fetch();
    return Promise.resolve(user);
  }

  async fetchConversationParticipant(
    conversationSid: string,
    participantSid: string,
  ): Promise<ParticipantInstance> {
    const participant = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .conversations(conversationSid)
      .participants(participantSid)
      .fetch();
    return Promise.resolve(participant);
  }

  async addChatParticipant(
    conversationSid: string,
    opts: AddChatParticipantDto,
  ): Promise<ParticipantInstance> {
    const participant = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .conversations(conversationSid)
      .participants.create(opts);

    return Promise.resolve(participant);
  }

  async deleteConversations(conversationSid: string): Promise<boolean> {
    const deleted = await this.twilioClient.conversations
    .services(TWILIO_CONVERSATIONS_SERVICE_SID)
    .conversations(conversationSid)
    .remove();
    return Promise.resolve(deleted);
  }

  async createSubaccount(friendlyName: string): Promise<AccountInstance> {
    const subaccount = await this.twilioClient.api.accounts.create({ friendlyName });
    subaccount.sid;

    return Promise.resolve(subaccount);
  }

  async fetchAvailablePhoneNumbers(): Promise<LocalInstance[]> {
    const phoneNumberList = await this.twilioClient
      .availablePhoneNumbers('US')
      .local.list({ mmsEnabled: true, smsEnabled: true, limit: 20 });

    return Promise.resolve(phoneNumberList);
  }

  async fetchConversationsByParticipantSid(phone: string): Promise<any> {
    const conversations = await this.twilioClient.conversations
      .services(TWILIO_CONVERSATIONS_SERVICE_SID)
      .participantConversations.list({address: phone});
      
    return Promise.resolve(conversations);
  }

  async fetchConversation(sid: string): Promise<any> {
    const conversation = await this.twilioClient.conversations.services('IS1faac97ab6954bb8828c6edead9e4513').conversations(sid).fetch();
    return Promise.resolve(conversation);
  }
}
