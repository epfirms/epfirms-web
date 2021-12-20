import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
import { AwsService } from '../services/aws.service';
import { Service } from 'typedi';
const { AWS_BUCKET } = require('@configs/vars')

@Service()
export class AWSController {
  constructor(private _awsService: AwsService){}

  /**
  * @name /api/gen - POST
  * @param req.body { key: string, fileType: mime type}
  * key should be a string made like so "user_id/fileType/fileName"
  * @return returns the presigned url to upload to
  */
  public async generatePresignedURL(req : Request, res: Response) : Promise<any> {
    try {
      const { userId, docType, docName, contentType } = req.body;
      const key = this._awsService.formatObjectKey(userId, docType, docName);
      const uploadURL = await this._awsService.getObjectUploadURL(AWS_BUCKET, key, contentType);

      res.status(StatusConstants.OK).send({url: uploadURL, key: key});
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
  }
}

  public async deleteDocument(req : Request, res: Response): Promise<any> {
    try {
      const { doc_key } = req.body;

      const isDeleted: boolean = await this._awsService.deleteObjectFromBucket(AWS_BUCKET, doc_key);

      res.status(StatusConstants.OK).send({aws_res: isDeleted, deleted: true});
    } catch (error) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }

  public async downloadDocumentFromPresignedURL(req : Request, res: Response): Promise<any> {
    try {
      const { key } = req.body;

      const downloadURL: string = await this._awsService.getObjectDownloadURL(AWS_BUCKET, key);
      
      res.status(StatusConstants.OK).send({url: downloadURL});
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }


  public async updateDocument(req : Request, res: Response): Promise<any> {
    try {
      const { source, updatedValues } = req.body;

      const updatedKey: string = this._awsService.formatObjectKey(updatedValues.userId, updatedValues.docType, updatedValues.docName);
      const sourceCopied: boolean = await this._awsService.copySourceObject(AWS_BUCKET, {source: source, target: updatedKey});
      
      if (sourceCopied) {
        const sourceObjectDeleted: boolean = await this._awsService.deleteObjectFromBucket(AWS_BUCKET, source);

        res.status(StatusConstants.OK).send({deleted: sourceObjectDeleted, updated: sourceCopied, update_and_delete: true, doc_key: updatedKey});
      }
      else {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({error: "AWS update error"});
      }
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
