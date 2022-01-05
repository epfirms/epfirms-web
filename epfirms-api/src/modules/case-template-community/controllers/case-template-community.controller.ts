import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { CaseTemplateCommunityService } from '../services/case-template-community.service';
import { Service } from 'typedi';
import { AwsService } from '@src/modules/aws/services/aws.service';
import { FirmCaseTemplateService } from '@src/modules/firm/services/firm-case-template.service';
const { S3_TASK_DOCUMENTS_BUCKET } = require('@configs/vars');

@Service()
export class CaseTemplateCommunityController {
  constructor(
    private _communityCaseTemplateService: CaseTemplateCommunityService,
    private _awsService: AwsService,
    private _firmCaseTemplateService: FirmCaseTemplateService,
  ) {}

  public async copyTemplateToFirm(req: any, res: Response): Promise<any> {
    try {
      const { id } = req.body;
      const { firm_id } = req.user.firm_access;

      const communityTemplate = await this._communityCaseTemplateService.getById(id);

      const templateValues = { ...communityTemplate.dataValues };
      delete templateValues.id;
      templateValues.firm_id = firm_id;
      const firmTemplate = await this._firmCaseTemplateService.create(templateValues);
      for (let task of templateValues.community_template_tasks) {
        const taskValues = { ...task.dataValues };
        delete taskValues.id;
        taskValues.template_id = firmTemplate.id;
        const firmTemplateTask = await this._firmCaseTemplateService.addTask(taskValues);
        if (task.community_template_task_files.length) {
          const fileValues = { ...task.community_template_task_files[0].dataValues };
          delete fileValues.id;
          fileValues.firm_template_task_id = firmTemplateTask.id;
          await this._firmCaseTemplateService.attachFileToTask(firmTemplateTask.id, fileValues);
        }
      }

      res.status(StatusConstants.OK).send({ success: true });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async getById(req: any, res: Response): Promise<any> {
    try {
      const { id } = req.params;

      const created = await this._communityCaseTemplateService.getById(parseInt(id));

      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async get(req: any, res: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;

      const all = await this._communityCaseTemplateService.get(firm_id);
      const firm = await this._communityCaseTemplateService.getAllByFirmId(firm_id);
      res.status(StatusConstants.OK).send({all, firm});
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async create(req: any, res: Response): Promise<any> {
    try {
      let template = req.body;
      const { firm_id } = req.user.firm_access;

      template.firm_id = firm_id;
      delete template.id;

      const created = await this._communityCaseTemplateService.create(template);

      for (let task of template.firm_template_tasks) {
        delete task.id;
        task.template_id = created.id;
        const communityTemplateTask = await this._communityCaseTemplateService.addTask(task);
        if (task.firm_template_task_files.length) {
          const fileValues = { ...task.firm_template_task_files[0] };
          delete fileValues.id;
          fileValues.firm_template_task_id = communityTemplateTask.id;
          await this._communityCaseTemplateService.attachFileToTask(communityTemplateTask.id, fileValues);
        }
      }

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
        changes,
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
        parseInt(case_template_task_id),
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
      const uploadURL = await this._awsService.getObjectUploadURL(
        S3_TASK_DOCUMENTS_BUCKET,
        key,
        MIME,
      );

      res.status(StatusConstants.OK).send({ url: uploadURL, key: key });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async getTaskFileDownloadURL(req: any, res: Response): Promise<any> {
    try {
      const { key } = req.query;

      const downloadURL: string = await this._awsService.getObjectDownloadURL(
        S3_TASK_DOCUMENTS_BUCKET,
        decodeURIComponent(key),
      );

      res.status(StatusConstants.OK).send({ url: downloadURL });
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

      const updated = await this._communityCaseTemplateService.updateFileOnTask(
        fileId,
        fileChanges,
      );
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
