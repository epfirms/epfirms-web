import { Response } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { MatterService } from '@modules/matter/services/matter.service';
import { MatterTaskService } from '../services/matter-task.service';
import { Service } from 'typedi';
import { AwsService } from '@src/modules/aws/services/aws.service';
import { MatterTaskFileService } from '../services/matter-task-file.service';
const { S3_TASK_DOCUMENTS_BUCKET } = require('@configs/vars')

@Service()
export class MatterTaskController {
  constructor(
    private _matterService: MatterService,
    private _matterTaskService: MatterTaskService,
    private _awsService: AwsService,
    private _matterTaskFileService: MatterTaskFileService
  ) {}

  public async createTask(req: any, resp: Response): Promise<any> {
    try {
      const task = req.body;
      const { firm_id } = req.user.firm_access;

      const newTask = await this._matterTaskService.create(task);

      if (task.matter_task_file) {
        const sourceKey = task.matter_task_file.key;
        const targetKey = await this._awsService.formatObjectKey(firm_id, 'task', task.matter_task_file.name)
        const source = {
          bucketName: S3_TASK_DOCUMENTS_BUCKET,
          key: sourceKey
        };
        const target = {
          bucketName: S3_TASK_DOCUMENTS_BUCKET,
          key: targetKey
        }
        const copySuccess = await this._awsService.copy(source, target);

        if (copySuccess) {
          const newFile = {
            name: task.matter_task_file.name,
            description: task.matter_task_file.description,
            key: targetKey
          }
          await this._matterTaskFileService.attach(newTask.id, newFile)
        }
      }

      if (task.matter_task_sms_message) {
        const newSms = {
          body: task.matter_task_sms_message.body
        };
        await this._matterTaskService.createSmsAutomation(newTask.id, newSms);
      }
      
      const matter = await this._matterService.getOne(newTask.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async updateTask(req: any, resp: Response): Promise<any> {
    try {
      const task = req.body;

      const updatedTask = await this._matterTaskService.update(task);

      const matter = await this._matterService.getOne(task.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async deleteTask(req: any, resp: Response): Promise<any> {
    try {
      const { id } = req.body;

      const matterTask = await this._matterTaskService.get(id);

      const deletedTask = await this._matterTaskService.delete(id);

      const matter = await this._matterService.getOne(matterTask.matter_id);

      resp.status(StatusConstants.OK).send(matter);
    } catch (error) {
      resp.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
