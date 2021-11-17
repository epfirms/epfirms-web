import Container from 'typedi';
import { emailsController } from './emails.controller';

const EmailsController = Container.get(emailsController);

export { EmailsController };