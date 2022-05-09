import Container from 'typedi';
import { PaymentProcessorWebhookController } from './webhook.controller';

const paymentProcessorWebhookController = Container.get(PaymentProcessorWebhookController);

export { paymentProcessorWebhookController };
