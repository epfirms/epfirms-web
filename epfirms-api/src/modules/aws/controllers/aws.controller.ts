import { Response, Request } from 'express';
import { StatusConstants } from '@src/constants/StatusConstants';
const aws = require('aws-sdk');
require('dotenv').config();


export class AWSController {

  s3;

  constructor(){
    // aws class properties
    aws.config.update({
      secretAccessKey: process.env.AWS_SECRET_KEY,
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      region: process.env.AWS_REGION,
    });

    this.s3 = new aws.S3();
  }

  /**
  * @name /api/gen - POST
  * @param req.body { key: string, fileType: mime type}
  * key should be a string made like so "user_id/fileType/fileName"
  * @return returns the presigned url to upload to
  */
  public async generatePresignedURL(req : Request, res: Response) : Promise<any> {

      // create the params for the aws s3 api
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.body.key,
        Expires: 40 * 60,
        ACL: 'bucket-owner-full-control',
        ContentType: req.body.fileType,
      }

      this.s3.getSignedUrl('putObject', params, async (err, url) => {
        if (err){
          res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({err: err});
        }
        else {
          res.status(StatusConstants.OK).send({url: url});
        }
      });
  }

  public async deleteDocument(req, res ): Promise<any> {
    try {
      const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.body.doc_key
      }
      const result = await this.s3.deleteObject(params).promise();

      if (result.DeleteMarker){
        res.status(StatusConstants.OK).send({aws_res: result, deleted: true});
      }
      else {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({error: "AWS deletion error"});
      }
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);

    }
  }

  public async downloadDocumentFromPresignedURL(req, res): Promise<any> {
    try {
      const getSignedURLParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.body.key,
        Expires: 60 * 5
      }
      const getObjectHeadParams = {
        Bucket: process.env.AWS_BUCKET,
        Key: req.body.key
      }

      this.s3.getSignedUrl('getObject', getSignedURLParams, (err, url)=> {
        if (err){
          res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
        }
        else {
          res.status(StatusConstants.OK).send({url: url});
        }
      });

    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }


  public async updateDocument(req, res): Promise<any> {
    try {

      const cloneParams = {
        Bucket: process.env.AWS_BUCKET,
        CopySource: process.env.AWS_BUCKET + '/' + req.body.oldKey,
        Key: req.body.key
      }
      // clone the existing data in the s3 first
      const cloned = await this.s3.copyObject(cloneParams).promise();

      if (cloned.CopyObjectResult){
        // delete the old one
        const deleteParams = {
          Bucket: process.env.AWS_BUCKET,
          Key: req.body.oldKey
        }
        const deleted = await this.s3.deleteObject(deleteParams).promise();
        if (deleted.DeleteMarker){
          res.status(StatusConstants.OK).send({deleted: deleted, updated: cloned, update_and_delete: true});
        }
        else {
          res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({error: "AWS deletion error"});
        }
      }
      else {
        res.status(StatusConstants.INTERNAL_SERVER_ERROR).send({error: "AWS update error"});
      }
    } catch (err) {
      res.status(StatusConstants.INTERNAL_SERVER_ERROR).send(err);
    }
  }
}
