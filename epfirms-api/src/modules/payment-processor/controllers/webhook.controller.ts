import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { PaymentProcessorService } from '@modules/payment-processor/services/payment-processor.service';

export class PaymentProcessorWebhookController {
  constructor() {}

  public async handleInvoiceWebhook(req: Request, resp: Response): Promise<any> {
    try {
      const event = req.body;
      const { customer, period_end, customer_email } = event.data.object;

      switch (event.type) {
        case 'invoice.paid':
          await PaymentProcessorService.handlePaidInvoice(customer, period_end);
          break;
        case 'invoice.upcoming':
          await PaymentProcessorService.handleUpcomingInvoice(customer_email);
          break;
        case 'invoice.payment_failed':
          await PaymentProcessorService.handlePaymentFailed(customer, customer_email);
          break;
      }

      resp.status(StatusConstants.OK).json({ received: true });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
