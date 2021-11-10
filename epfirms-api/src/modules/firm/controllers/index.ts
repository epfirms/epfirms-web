import { FirmController } from './firm.controller';
import { FirmTaskTemplateController } from './firm-task-template.controller';

const firmController = new FirmController();

const firmTaskTemplateController = new FirmTaskTemplateController();

export { firmController, firmTaskTemplateController };