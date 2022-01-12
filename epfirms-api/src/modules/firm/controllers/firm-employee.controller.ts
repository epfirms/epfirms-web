import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { FirmEmployeeService } from '../services/firm-employee.service';

@Service()
export class FirmEmployeeController {
  constructor(private _firmEmployeeService: FirmEmployeeService) {}

  public async getAll(req: any, resp: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const employeeList = await this._firmEmployeeService.getAll(firm_id);

      resp.status(StatusConstants.OK).send(employeeList);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async create(req: any, resp: Response): Promise<any> {
    try {
      const firmEmployee = req.body;
      const { role } = firmEmployee;
      const { firm_id } = req.user.firm_access;

      const newEmployee = await this._firmEmployeeService.add(firm_id, firmEmployee);

      await this._firmEmployeeService.setRoles(newEmployee.id, role);

      const employee = await this._firmEmployeeService.getByUserId(firm_id, newEmployee.id);

      resp.status(StatusConstants.CREATED).send({ success: true, data: employee });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async update(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.params;
      const updatedEmployee = req.body;
      const { firm_id } = req.user.firm_access;

      await this._firmEmployeeService.update(id, updatedEmployee);

      const employee = await this._firmEmployeeService.getByUserId(firm_id, updatedEmployee.user.id);

      resp.status(StatusConstants.CREATED).send({ success: true, data: employee });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async delete(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.params;

      await this._firmEmployeeService.update(id, {active: false});

      resp.status(StatusConstants.OK).send({ success: true, data: {id, active: false} });
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
