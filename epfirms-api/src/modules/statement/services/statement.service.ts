import { Database } from '@src/core/Database';

export class StatementService {

  public static async create(data) : Promise<any> {
    try {
      const created = await Database.models.statement.create(data);
      return Promise.resolve(created);
    } catch (err) {
      console.error(err);
    }
  }
  public static async getAllByMatterId(matterId) : Promise<any> {
    try {
      const queried = await Database.models.statement.findAll({where: {matter_id: matterId}});
      return Promise.resolve(queried);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async update(body) : Promise<any> {
    try {
      const updated = await Database.models.statement.update(body, {where: {id: body.id}});
      return Promise.resolve(updated);
    }
    catch (err) {
      console.error(err);
    }
  }
  public static async delete(id) : Promise<any> {
    try {
      const deleted = await Database.models.statement.destroy({where: {id: id}});
      return Promise.resolve(deleted);
    }
    catch (err) {
      console.error(err);
    }
  }

  public static async createCsv(statementId) : Promise<any> {
    try {
      const statement = await Database.models.statement.findOne({where: {id: statementId}});
      const bills = await Database.models.matter_billing.findAll({where: {statement_id: statementId, type: 0, reconciled: true}});
      let csv = "Employee ID, Date, Employee Name, Hourly Rate, Hours, Amount, Waived, Description\n";
      bills.forEach(item => {
        let bill = item.dataValues;
        csv += `${bill.track_time_for},${new Date(bill.date).toDateString()},${
          bill.employee_name
        },${bill.hourly_rate},${bill.hours}, ${bill.amount},${bill.waive},${bill.description}\n`;
      });
      return Promise.resolve({statement: statement.dataValues, csv: csv});
    } catch (error) {
      console.error(error);
    }
  }
}
