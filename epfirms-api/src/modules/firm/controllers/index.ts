import { FirmController } from './firm.controller';
import Container from 'typedi';
import { FirmEmployeeController } from './firm-employee.controller';

const firmController = Container.get(FirmController);

const firmEmployeeController = Container.get(FirmEmployeeController);

export { firmController, firmEmployeeController };