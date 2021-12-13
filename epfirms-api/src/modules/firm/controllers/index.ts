import { FirmController } from './firm.controller';
import { FirmTaskTemplateController } from './firm-task-template.controller';
import Container from 'typedi';

const firmController = Container.get(FirmController);

const firmTaskTemplateController = Container.get(FirmTaskTemplateController);

export { firmController, firmTaskTemplateController };