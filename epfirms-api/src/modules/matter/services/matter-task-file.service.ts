import { Database } from '@src/core/Database';
import { Service } from 'typedi';

@Service()
export class MatterTaskFileService {
  public async attach(taskId: number, file: any): Promise<any> {
    try {
      console.log(taskId, file);
      const { matter_task } = Database.models;
      const task = await matter_task.findOne({ where: { id:taskId } });
      const newFile = await task.createMatter_task_file(file);

      return Promise.resolve(newFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async update(id: number, changes: any): Promise<any> {
    try {
      const { matter_task_file } = Database.models;
      const updatedFile = await matter_task_file.update(changes, { where: { id } });
      return Promise.resolve(updatedFile);
    } catch (err) {
      console.error(err);
    }
  }

  public async remove(id: number): Promise<any> {
    try {
      const { matter_task_file } = Database.models;
      await matter_task_file.destroy({ where: { id } });
      return Promise.resolve(true);
    } catch (err) {
      console.error(err);
    }
  }
}
