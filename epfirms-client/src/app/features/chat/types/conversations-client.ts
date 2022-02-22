/** 
 * Connection state of the client. Values:
 * - 'connecting' - Client is offline and connection attempt is in process.
 * - 'connected' - Client is online and ready.
 * - 'disconnecting' - Client is going offline as disconnection is in process.
 * - 'disconnected' - Client is offline and no connection attempt is in process.
 * - 'denied' - Client connection is denied because of invalid JWT acces token. User must refresh token in order to proceed.
 */
export type ConnectionState =
  | 'connecting'
  | 'connected'
  | 'disconnecting'
  | 'disconnected'
  | 'denied';

/** The status of the conversation, relative to the client.
 * - 'notParticipating' - Client is not participating in the conversation.
 * - 'joined' - Client has joined the conversation.
 */
export type ConversationStatus = 'notParticipating' | 'joined';

/** Message delivery status. */
export type DeliverStatus = 'sent' | 'delivered' | 'failed' | 'read' | 'undelivered' | 'queued';

/** The reason for the updated event being emitted by a message. */
export type MessageUpdateReason = 'body' | 'lastUpdatedBy' | 'dateCreated' | 'dateUpdated' | 'attributes' | 'author' | 'deliveryReceipt' | 'subject';

/** Push notification type. */
export type ChatPushNotificationType =
  | 'twilio.conversations.new_message'
  | 'twilio.conversations.added_to_conversation'
  | 'twilio.conversations.removed_from_conversation';

/** Additional data for a given push notification. */
export interface ChatPushNotificationData {
  /** SID of the conversation. */
  conversationSid?: string;
  /** Index of the message in the conversation. */
  messageIndex?: number;
  /** SID of the message in the conversation. */
  messageSid?: string;
}

/** Push notification for a Conversations client. */
export interface ChatPushNotification {
  /** Notification action (click_action in FCM terms and category in APN terms). */
  readonly action: string;
  /** Number of the badge. */
  readonly badge: number;
  /** Text of the notification. */
  readonly body: string;
  /** Additional data of the conversation. */
  readonly data: ChatPushNotificationData;
  /** Sound of the notification. */
  readonly sound: string;
  /** Title of the notification. */
  readonly title: string;
  /** Type of the notification. */
  readonly type: ChatPushNotificationType;
}

/** Info for connection error event. */
export interface ConnectionErrorData {
  /** Twilsock will stop connection attempts if true. */
  terminal: boolean;
  /** The error message of the root cause. */
  message: string;
  /** HTTP status code if available. */
  httpStatusCode?: number;
  /** Twilio public error code if available. */
  errorCode?: number;
}