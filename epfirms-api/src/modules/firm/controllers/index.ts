import { FirmController } from './firm.controller';
import { FirmTaskTemplateController } from './firm-task-template.controller';
import Container from 'typedi';
import { FirmEmployeeController } from './firm-employee.controller';

const firmController = Container.get(FirmController);

const firmTaskTemplateController = Container.get(FirmTaskTemplateController);

const firmEmployeeController = Container.get(FirmEmployeeController);

export { firmController, firmTaskTemplateController, firmEmployeeController };