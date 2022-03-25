import { IsString, IsOptional } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ParticipantListInstanceCreateOptions, ParticipantWebhookEnabledType } from 'twilio/lib/rest/conversations/v1/service/conversation/participant';

export class AddChatParticipantDto implements ParticipantListInstanceCreateOptions {
  @Transform(({value}) => JSON.stringify(value))
  attributes?: string;

  dateCreated?: Date;

  dateUpdated?: Date;

  @IsOptional()
  @Type(() => String)
  @IsString()
  identity?: string;

  messagingBinding?: {
    address?: string;
    proxyAddress?: string;
    projectedAddress?: string;
  };

  roleSid?: string;
  
  xTwilioWebhookEnabled?: ParticipantWebhookEnabledType;
}
