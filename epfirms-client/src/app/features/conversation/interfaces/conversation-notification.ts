import { User } from "@app/features/user/interfaces/user";
import { Message } from "@twilio/conversations";

export interface ConversationNotification {
  message: Message;
  user: User;
}
