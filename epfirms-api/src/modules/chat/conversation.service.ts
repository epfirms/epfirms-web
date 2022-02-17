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

  public async createUser(identity: string, friendlyName: string): Promise<any> {
    const user = await this.twilioClient.conversations.services(TWILIO_CONVERSATIONS_SERVICE_SID).users.create({identity, friendlyName});
    return Promise.resolve(user);
  }
}
