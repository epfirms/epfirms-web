import Container from 'typedi';
import { AuthController } from './auth.controller';

const authController = Container.get(AuthController);

export { authController };
