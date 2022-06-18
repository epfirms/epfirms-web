import { CaseTemplateService } from './case-template.service';
import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { AwsService } from '@src/modules/aws/services/aws.service';
const { S3_TASK_DOCUMENTS_BUCKET } = require('@configs/vars')

@Service()
export class CaseTemplateController {
 constructor(private _caseTemplateService: CaseTemplateService, private _awsService: AwsService) {}

  public async getOne(req: any, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const template = await this._caseTemplateService.getOne(id);

      res.status(StatusConstants.OK).send(template);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async get(req: any, res: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const created = await this._caseTemplateService.get(firm_id);

      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async create(req: any, res: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;
      let template = req.body;
      template.firm_id = firm_id;
      const created = await this._caseTemplateService.create(template);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    try {
      const { firm_case_template_id } = req.params;
      const changes = req.body;
      const updated = await this._caseTemplateService.update(
        parseInt(firm_case_template_id),
        changes
      );
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const { firm_case_template_id } = req.params;
      const deleted = await this._caseTemplateService.delete(firm_case_template_id);
      res.status(StatusConstants.OK).send({ id: deleted });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  public async addTask(req: Request, res: Response): Promise<any> {
    try {
      let task = req.body;
      task.template_id = parseInt(req.params.firm_case_template_id);
      const created = await this._caseTemplateService.addTask(task);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async updateTask(req: Request, res: Response): Promise<any> {
    try {
      const taskId = req.params.firm_template_task_id;
      const taskChanges = req.body;

      const updated = await this._caseTemplateService.updateTask(taskId, taskChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<any> {
    try {
      const { firm_template_task_id } = req.params;
      const deleted = await this._caseTemplateService.deleteTask(
        parseInt(firm_template_task_id)
      );
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async getTaskFileUploadURL(req: any, res: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;
      const { name, MIME } = req.query;
      const key = this._awsService.formatObjectKey(firm_id, 'template', name);
      const uploadURL = await this._awsService.getObjectUploadURL(S3_TASK_DOCUMENTS_BUCKET, key, MIME);

      res.status(StatusConstants.OK).send({url: uploadURL, key: key});
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async getTaskFileDownloadURL(req: any, res: Response): Promise<any> {
    try {
      const { key } = req.query;

      const downloadURL: string = await this._awsService.getObjectDownloadURL(S3_TASK_DOCUMENTS_BUCKET, decodeURIComponent(key));
      
      res.status(StatusConstants.OK).send({url: downloadURL});
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async addTaskFile(req: Request, res: Response): Promise<any> {
    try {
      const taskId = parseInt(req.params.firm_template_task_id);
      const file = req.body;
      const created = await this._caseTemplateService.attachFileToTask(taskId, file);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async updateTaskFile(req: Request, res: Response): Promise<any> {
    try {
      const fileId: number = parseInt(req.params.file_id);
      const fileChanges: any = req.body;

      const updated = await this._caseTemplateService.updateFileOnTask(fileId, fileChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async deleteTaskFile(req: Request, res: Response): Promise<any> {
    try {
      const fileId: number = parseInt(req.params.file_id);

      const deleted = await this._caseTemplateService.removeFileFromTask(fileId);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async createTaskSms(req: Request, res: Response): Promise<any> {
    try {
      const taskId = parseInt(req.params.task_id);
      const smsData = req.body;
      const created = await this._caseTemplateService.createSmsAutomation(taskId, smsData);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async updateTaskSms(req: Request, res: Response): Promise<any> {
    try {
      const taskSmsId: number = parseInt(req.params.sms_id);
      const taskSmsChanges: any = req.body;

      const updated = await this._caseTemplateService.updateSmsAutomation(taskSmsId, taskSmsChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async deleteTaskSms(req: Request, res: Response): Promise<any> {
    try {
      const taskSmsId: number = parseInt(req.params.sms_id);

      const deleted = await this._caseTemplateService.removeSmsAutomation(taskSmsId);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
