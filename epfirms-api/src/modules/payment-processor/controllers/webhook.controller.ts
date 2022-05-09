import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { PaymentProcessorService } from '@modules/payment-processor/services/payment-processor.service';
import { Service } from 'typedi';

@Service()
export class PaymentProcessorWebhookController {
  constructor(
    private _paymentProcessorService: PaymentProcessorService
  ) {}

  public async handleInvoiceWebhook(req: Request, resp: Response): Promise<any> {
    try {
      const event = req.body;
      const { customer, customer_email, lines } = event.data.object;
      const current_period_end = lines.data[0].period.end;
      switch (event.type) {
        case 'invoice.paid':
          await this._paymentProcessorService.handlePaidInvoice(customer, current_period_end);
          break;
        case 'invoice.upcoming':
          await this._paymentProcessorService.handleUpcomingInvoice(customer_email);
          break;
        case 'invoice.payment_failed':
          await this._paymentProcessorService.handlePaymentFailed(customer, customer_email);
          break;
      }

      resp.status(StatusConstants.OK).json({ received: true });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }
}
