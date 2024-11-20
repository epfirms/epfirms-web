import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { AwsService } from '../aws/services/aws.service';
import { ConfigService } from '../config/config.service';
import { MatterTaskFileService } from '../matter/services/matter-task-file.service';
import { TaskService } from './task.service';

@Service()
export class TaskController {
  constructor(
    private _taskService: TaskService,
    private _awsService: AwsService,
    private _configService: ConfigService,
    private _matterTaskFileService: MatterTaskFileService
    ) {}

  public async getOne(req, res) {
    try {
      const taskId = req.params.id;
      const { firm_id } = req.user.firm_access;

      const tasks = await this._taskService.getOne(firm_id, {id: taskId});
      res.status(StatusConstants.OK).send(tasks);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({"message": error.message});
    }
  }

  public async getAll(req, res) {
    try {
      const { firm_id } = req.user.firm_access;
      const filters = req.query;

      const tasks = await this._taskService.getAll(firm_id, filters);
      res.status(StatusConstants.OK).send(tasks);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({"message": error.message});
    }
  }

  public async update(req, res) {
    try {
      const task = req.body.data;
      const { firm_id } = req.user.firm_access;

      const updatedTask = await this._taskService.update(task);

      const updated = await this._taskService.getOne(firm_id, {id: task.id});

      res.status(StatusConstants.OK).send(updated);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error);
    }
  }

  public async delete(req, res) {
    try {
      const { id } = req.user;
      const { firm_id } = req.user.firm_access;
      const filters = req.query;
      // Assign current user as default.
      if (!filters.assignee_id) {
        filters.assignee_id = id;
      }
      const tasks = await this._taskService.getAll(firm_id, filters);
      res.status(StatusConstants.OK).send(tasks);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({"message": error.message});
    }
  }

  public async create(req, res) {
    try {
      const task = req.body.data;
      const { firm_id } = req.user.firm_access;

      const newTask = await this._taskService.create(task);

      if (task.matter_task_file) {
        const s3TaskDocumentsBucket = this._configService.get<string>('S3_TASK_DOCUMENTS_BUCKET');
        const sourceKey = task.matter_task_file.key;
        const targetKey = await this._awsService.formatObjectKey(firm_id, 'task', task.matter_task_file.name)
        const source = {
          bucketName: s3TaskDocumentsBucket,
          key: sourceKey
        };
        const target = {
          bucketName: s3TaskDocumentsBucket,
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
        await this._taskService.createSmsAutomation(newTask.id, newSms);
      }
      
      const createdTask = await this._taskService.getOne(firm_id, {id: newTask.id});

      res.status(StatusConstants.OK).send(createdTask);
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
