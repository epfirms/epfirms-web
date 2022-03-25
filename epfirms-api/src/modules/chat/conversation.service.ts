import { Service } from 'typedi';
import twilio = require('twilio');
import AccessToken = require('twilio/lib/jwt/AccessToken');
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/service/conversation/participant';
import { LocalInstance } from 'twilio/lib/rest/api/v2010/account/availablePhoneNumber/local';
import { AccountInstance } from 'twilio/lib/rest/api/v2010/account';
import { AddChatParticipantDto } from './dto';
import { UserInstance } from 'twilio/lib/rest/conversations/v1/service/user';
const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_API_KEY_SID,
  TWILIO_API_KEY_SECRET,
  TWILIO_CONVERSATIONS_SERVICE_SID
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
  public async createChatGrant(): Promise<AccessToken.ChatGrant> {
    const chatGrant = new AccessToken.ChatGrant({
      serviceSid: TWILIO_CONVERSATIONS_SERVICE_SID,
    });

    return Promise.resolve(chatGrant);
  }

  /**
   * Creates an access token for use with twilio SDK client.
   */
  public async createAccessToken(
    identity: string,
    grants: {
      chat: AccessToken.ChatGrant,
    }
  ): Promise<AccessToken> {
    const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
      identity: identity,
    });

    token.addGrant(grants.chat);
    return Promise.resolve(token);
  }

  public async createUser(identity: string, friendlyName: string): Promise<any> {
    const user = await this.twilioClient.conversations.services(TWILIO_CONVERSATIONS_SERVICE_SID).users.create({identity, friendlyName});
    return Promise.resolve(user);
  }

  public async fetchUser(userSid: string): Promise<UserInstance> {
    const user = await this.twilioClient.conversations.services(TWILIO_CONVERSATIONS_SERVICE_SID).users(userSid).fetch();
    return Promise.resolve(user);
  }

  public async fetchConversationParticipant(conversationSid: string, participantSid: string): Promise<ParticipantInstance> {
    const participant = await this.twilioClient.conversations.services(TWILIO_CONVERSATIONS_SERVICE_SID).conversations(conversationSid).participants(participantSid).fetch();
    return Promise.resolve(participant);
  }

  public async addChatParticipant(conversationSid: string, opts: AddChatParticipantDto): Promise<ParticipantInstance> {
    const participant = await this.twilioClient.conversations.services(TWILIO_CONVERSATIONS_SERVICE_SID).conversations(conversationSid).participants.create(opts);

    return Promise.resolve(participant);
  }

  public async createSubaccount(friendlyName: string): Promise<AccountInstance> {
    const subaccount = await this.twilioClient.api.accounts.create({friendlyName});
    subaccount.sid;

    return Promise.resolve(subaccount);
  } 

  public async fetchAvailablePhoneNumbers(): Promise<LocalInstance[]> {
    const phoneNumberList = await this.twilioClient.availablePhoneNumbers('US').local.list({mmsEnabled: true, smsEnabled: true, limit: 20});

    return Promise.resolve(phoneNumberList);
  }
}
