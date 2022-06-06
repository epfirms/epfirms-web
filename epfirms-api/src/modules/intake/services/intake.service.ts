import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class IntakeService {
  public static async upsert(data): Promise<any> {
    try {
      const created = await Database.models.matter_intake.upsert(data);

      return Promise.resolve(created);
    } catch (error) {
      console.error(error);
    }
  }

  public static async delete(id): Promise<any> {
    try {
      const deleted = await Database.models.matter_intake.destroy({ where: { id: id } });
      return Promise.resolve(deleted);
    } catch (error) {
      console.error(error);
    }
  }

  public static async getOneWithMatterId(id): Promise<any> {
    try {
      const found = await Database.models.matter_intake.findOne({ where: { matter_id: id } });
      return Promise.resolve(found);
    } catch (error) {
      console.error(error);
    }
  }

  public static async updateReviewStatus(data): Promise<any> {
    try {
      const updated = await Database.models.matter_intake.update(
        { is_review_eligible: true},
        { where: { id: data.id } },
      );

      // after the intake is updated, we need to get the matter and create a new MatterTask
      // assigned to the attorney to review the intake

      const matter = await Database.models.matter.findOne({ where: { id: data.matter_id } });


      const task = {
        matter_id: matter.id,
        name: "Review Intake",
        assignee_id: matter.attorney_id,
        due: new Date(Date.now() + (1000 * 60 * 60 * 24 * 2)),

      }

      const createdTask = await Database.models.matter_task.create(task);

      console.log("\n\n\n\ncreatedTask\n\n\n", createdTask);

      return Promise.resolve(updated);
    } catch (error) {
      console.error(error);
    }
  }
}
