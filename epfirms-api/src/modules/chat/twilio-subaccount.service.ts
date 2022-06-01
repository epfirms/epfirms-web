import { Inject, Service, Token } from 'typedi';
import { Database } from '@src/core/Database';
import { ConfigService } from '../config/config.service';
import twilio = require('twilio');
import { TwilioSubaccount } from './twilio.interface';
import {
  ConversationInstance,
  ConversationListInstanceCreateOptions,
} from 'twilio/lib/rest/conversations/v1/conversation';
import {
  MessageInstance,
  MessageListInstanceCreateOptions,
} from 'twilio/lib/rest/conversations/v1/conversation/message';
import { UserInstance } from 'twilio/lib/rest/conversations/v1/user';
import { ParticipantInstance } from 'twilio/lib/rest/conversations/v1/conversation/participant';
import { AddChatParticipantDto } from './dto';

/** Store a twilio subaccount's credentials. */
export const TWILIO_SUBACCOUNT_TOKEN = new Token<TwilioSubaccount>('SUBACCOUNT_TOKEN');

@Service({transient: true})
export class TwilioSubaccountService {
  twilioClient: twilio.Twilio;

  constructor(@Inject(TWILIO_SUBACCOUNT_TOKEN) protected subaccount: TwilioSubaccount) {
    console.log('TwilioSubaccountService instantiated');
    this.twilioClient = twilio(this.subaccount.sid, this.subaccount.authToken);
  }

  async createConversation(
    opts: ConversationListInstanceCreateOptions,
  ): Promise<ConversationInstance> {
    const conversation = await this.twilioClient.conversations.conversations.create(opts);
    return Promise.resolve(conversation);
  }

  async createMessage(
    conversationSid: string,
    opts: MessageListInstanceCreateOptions,
  ): Promise<MessageInstance> {
    const message = await this.twilioClient.conversations
      .conversations(conversationSid)
      .messages.create(opts);

    return Promise.resolve(message);
  }

  async createUser(identity: string, friendlyName: string): Promise<any> {
    const user = await this.twilioClient.conversations.users.create({ identity, friendlyName });
    return Promise.resolve(user);
  }

  async fetchUser(userSid: string): Promise<UserInstance> {
    const user = await this.twilioClient.conversations.users(userSid).fetch();
    return Promise.resolve(user);
  }

  async fetchConversationParticipant(
    conversationSid: string,
    participantSid: string,
  ): Promise<ParticipantInstance> {
    const participant = await this.twilioClient.conversations
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
      .conversations(conversationSid)
      .participants.create(opts);

    return Promise.resolve(participant);
  }

  async fetchConversation(sid: string): Promise<any> {
    const conversation = await this.twilioClient.conversations.conversations(sid).fetch();
    return Promise.resolve(conversation);
  }

  async deleteConversations(conversationSid: string): Promise<boolean> {
    const deleted = await this.twilioClient.conversations.conversations(conversationSid).remove();
    return Promise.resolve(deleted);
  }

  async fetchConversationsByParticipantSid(phone: string): Promise<any> {
    const conversations = await this.twilioClient.conversations.participantConversations.list({
      address: phone,
    });

    return Promise.resolve(conversations);
  }
}
