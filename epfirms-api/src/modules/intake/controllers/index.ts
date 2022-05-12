
import Container from 'typedi';
import { IntakeController } from './intake.controller';

const intakeController = Container.get(IntakeController);

export  {intakeController};
