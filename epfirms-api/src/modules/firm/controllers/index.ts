import { FirmController } from './firm.controller';
import { FirmCaseTemplateController } from './firm-case-template.controller';
import Container from 'typedi';
import { FirmEmployeeController } from './firm-employee.controller';

const firmController = Container.get(FirmController);

const firmCaseTemplateController = Container.get(FirmCaseTemplateController);

const firmEmployeeController = Container.get(FirmEmployeeController);

export { firmController, firmCaseTemplateController, firmEmployeeController };