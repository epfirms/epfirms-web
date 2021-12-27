import express from 'express'
import { userRouter } from '@modules/user/routes';
import { authRouter } from '@modules/auth/routes';
import { firmRouter } from '@modules/firm/routes';
import { taskRouter } from '@modules/task/routes';
import { matterRouter } from '@modules/matter/routes';
import { emailsRouter } from '@modules/emails/routes';
import { reviewsRouter } from '@modules/reviews/routes';
import { documentRouter } from '@src/modules/document/routes';
import { awsRouter } from '@src/modules/aws/routes';
import { legalAreaRouter } from '@src/modules/legal-area/routes';
import { matterActivityRouter } from '@src/modules/matter-activity/routes';
import { assetRouter } from '@src/modules/asset/routes';
import { matterBillingRouter } from '@src/modules/matter-billing/routes';
import { statementRouter } from '@src/modules/statement/routes';
import { betaSignupRouter } from '@src/modules/beta-signup/routes';
import { matterBillingSettingsRouter } from '@src/modules/matter-billing-settings/routes';

const v1Router = express.Router();

v1Router.use('/user', userRouter);
v1Router.use('/firm', firmRouter);
v1Router.use('/auth', authRouter);
v1Router.use('/task', taskRouter);
v1Router.use('/matters', matterRouter);
v1Router.use('/emails', emailsRouter);
v1Router.use('/reviews', reviewsRouter);
v1Router.use('/document', documentRouter);
v1Router.use('/documents', documentRouter);
v1Router.use('/aws', awsRouter);
v1Router.use('/legal-area', legalAreaRouter);
v1Router.use('/matter-activity', matterActivityRouter);
v1Router.use('/asset', assetRouter);
v1Router.use('/billing', matterBillingRouter);
v1Router.use('/statement', statementRouter);
v1Router.use('/sign-up', betaSignupRouter);
v1Router.use('/matter-billing-settings', matterBillingSettingsRouter)

export { v1Router }
