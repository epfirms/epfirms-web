import { Express } from "express";
import { v1Router } from '@src/core/routes/api/v1';
import { webhookRouter } from '@src/core/routes/webhook/webhook';

export class InitializeRoutes {
  public static async Initialize(app: Express) {
    app.use('/api', v1Router);
    app.use('/webhook', webhookRouter);
  }
}
