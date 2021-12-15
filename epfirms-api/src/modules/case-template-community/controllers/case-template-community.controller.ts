import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { CaseTemplateCommunityService } from '../services/case-template-community.service';
import { Service } from 'typedi';
import { AwsService } from '@src/modules/aws/services/aws.service';
const { S3_TASK_DOCUMENTS_BUCKET } = require('@configs/vars')

@Service()
export class CaseTemplateCommunityController {
  constructor(private _communityCaseTemplateService: CaseTemplateCommunityService, private _awsService: AwsService) {}

  public async get(req: any, res: Response): Promise<any> {
    try {
      const created = await this._communityCaseTemplateService.get();

      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async create(req: any, res: Response): Promise<any> {
    try {
      const { id } = req.user;
      let template = req.body;
      template.created_by = id;
      const created = await this._communityCaseTemplateService.create(template);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    try {
      const { case_template_id } = req.params;
      const changes = req.body;
      const updated = await this._communityCaseTemplateService.update(
        parseInt(case_template_id),
        changes
      );
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const { case_template_id } = req.params;
      const deleted = await this._communityCaseTemplateService.delete(case_template_id);
      res.status(StatusConstants.OK).send({ id: deleted });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err.message);
    }
  }

  public async addTask(req: Request, res: Response): Promise<any> {
    try {
      let task = req.body;
      task.template_id = parseInt(req.params.case_template_id);
      const created = await this._communityCaseTemplateService.addTask(task);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async updateTask(req: Request, res: Response): Promise<any> {
    try {
      const taskId = req.params.case_template_task_id;
      const taskChanges = req.body;

      const updated = await this._communityCaseTemplateService.updateTask(taskId, taskChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async deleteTask(req: Request, res: Response): Promise<any> {
    try {
      const { case_template_task_id } = req.params;
      const deleted = await this._communityCaseTemplateService.deleteTask(
        parseInt(case_template_task_id)
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
      const taskId = parseInt(req.params.case_template_task_id);
      const file = req.body;
      const created = await this._communityCaseTemplateService.attachFileToTask(taskId, file);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async updateTaskFile(req: Request, res: Response): Promise<any> {
    try {
      const fileId: number = parseInt(req.params.file_id);
      const fileChanges: any = req.body;

      const updated = await this._communityCaseTemplateService.updateFileOnTask(fileId, fileChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async deleteTaskFile(req: Request, res: Response): Promise<any> {
    try {
      const fileId: number = parseInt(req.params.file_id);

      const deleted = await this._communityCaseTemplateService.removeFileFromTask(fileId);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
