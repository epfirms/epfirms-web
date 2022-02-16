import { Service } from 'typedi';
import twilio = require('twilio');
import AccessToken = require('twilio/lib/jwt/AccessToken');
import { String } from 'aws-sdk/clients/appstream';
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
    chatGrant: AccessToken.ChatGrant,
  ): Promise<AccessToken> {
    const token = new AccessToken(TWILIO_ACCOUNT_SID, TWILIO_API_KEY_SID, TWILIO_API_KEY_SECRET, {
      identity: identity,
    });

    token.addGrant(chatGrant);

    return Promise.resolve(token);
  }

  /**
   * Creates a conversation.
   */
  public async create(name: string): Promise<any> {
    const conversation = await this.twilioClient.conversations.conversations.create({
      friendlyName: name,
    });

    return Promise.resolve(conversation);
  }

  /**
   * Fetches a conversation by sid.
   */
  public async get(sid: string): Promise<any> {
    const conversation = await this.twilioClient.conversations.conversations(sid).fetch();

    return Promise.resolve(conversation);
  }

  public async addSMSParticipant(
    sid: string,
    phoneNumber: string,
    proxyPhoneNumber: string,
  ): Promise<any> {
    const participant = await this.twilioClient.conversations
      .conversations(sid)
      .participants.create({
        messagingBinding: {
          address: phoneNumber,
          proxyAddress: proxyPhoneNumber,
        },
      });

    return Promise.resolve(participant);
  }

  public async addMessage(
    sid: string,
    message: {author: string, body: String}
  ): Promise<any> {
    const messages = await this.twilioClient.conversations.conversations(sid).messages.create(message);

    return Promise.resolve(messages);
  }

  public async getMessages(
    sid: string,
    opts: { limit?: number; order?: 'asc' | 'desc' } = { order: 'asc' },
  ): Promise<any> {
    const messages = await this.twilioClient.conversations.conversations(sid).messages.list(opts);

    return Promise.resolve(messages);
  }

  public async addChatParticipants(sid: string, participants:{identity: string}[] = []): Promise<any> {
    const addedParticipants = [];
    for (const { identity } of participants) {
      const participantInstance = await this.twilioClient.conversations.conversations(sid).participants.create({identity});
      addedParticipants.push(participantInstance);
    }

    return Promise.resolve(addedParticipants);
  }
}
