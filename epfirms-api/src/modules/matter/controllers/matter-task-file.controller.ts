import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { Service } from 'typedi';
import { AwsService } from '@src/modules/aws/services/aws.service';
import { MatterTaskFileService } from '../services/matter-task-file.service';
const { S3_TASK_DOCUMENTS_BUCKET } = require('@configs/vars');

@Service()
export class MatterTaskFileController {
  constructor(
    private _matterTaskFileService: MatterTaskFileService,
    private _awsService: AwsService
  ) {}

  public async getUploadURL(req: any, res: Response): Promise<any> {
    try {
      const { firm_id } = req.user.firm_access;
      const { name, MIME } = req.query;
      const key = this._awsService.formatObjectKey(firm_id, 'task', name);
      const uploadURL = await this._awsService.getObjectUploadURL(
        S3_TASK_DOCUMENTS_BUCKET,
        key,
        MIME
      );

      res.status(StatusConstants.OK).send({ url: uploadURL, key: key });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async getDownloadURL(req: any, res: Response): Promise<any> {
    try {
      const { key } = req.query;

      const downloadURL: string = await this._awsService.getObjectDownloadURL(
        S3_TASK_DOCUMENTS_BUCKET,
        decodeURIComponent(key)
      );

      res.status(StatusConstants.OK).send({ url: downloadURL });
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async add(req: Request, res: Response): Promise<any> {
    try {
      const taskId = parseInt(req.params.matter_task_id);
      const file = req.body;
      const created = await this._matterTaskFileService.attach(taskId, file);
      res.status(StatusConstants.OK).send(created);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async update(req: Request, res: Response): Promise<any> {
    try {
      const fileId: number = parseInt(req.params.file_id);
      const fileChanges: any = req.body;

      const updated = await this._matterTaskFileService.update(fileId, fileChanges);
      res.status(StatusConstants.OK).send(updated);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }

  public async delete(req: Request, res: Response): Promise<any> {
    try {
      const fileId: number = parseInt(req.params.file_id);

      const deleted = await this._matterTaskFileService.remove(fileId);
      res.status(StatusConstants.OK).send(deleted);
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
