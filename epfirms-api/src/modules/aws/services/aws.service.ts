import { S3 } from 'aws-sdk';
import AWS = require('aws-sdk');
import { Service } from 'typedi';
import { AwsCopyObjectParams, AwsS3Params, AwsSignedUrlParams } from '../interfaces/aws-s3-params';
const { AWS_REGION, AWS_SECRET_KEY, AWS_ACCESS_KEY_ID, S3_ENV_FOLDER } = require('@configs/vars');

@Service()
export class AwsService {
  private s3: S3;

  constructor() {
    AWS.config.update({
      secretAccessKey: AWS_SECRET_KEY,
      accessKeyId: AWS_ACCESS_KEY_ID,
      region: AWS_REGION
    });

    this.s3 = new AWS.S3();
  }

  public async getObjectUploadURL(
    bucketName: string,
    key: string,
    contentType: string
  ): Promise<string> {
    const params: AwsSignedUrlParams = {
      Bucket: bucketName,
      Key: key,
      Expires: 40 * 60,
      ACL: 'bucket-owner-full-control',
      ContentType: contentType
    };

    const uploadURL: string = await this.getSignedUrl('putObject', params);

    return Promise.resolve(uploadURL);
  }

  public async getObjectDownloadURL(bucketName: string, objectKey: string): Promise<string> {
    const params: AwsSignedUrlParams = {
      Bucket: bucketName,
      Key: objectKey,
      Expires: 60 * 5
    };

    const downloadURL: string = await this.getSignedUrl('getObject', params);

    return Promise.resolve(downloadURL);
  }

  public async deleteObjectFromBucket(bucketName: string, objectKey: string): Promise<boolean> {
    const params: AwsS3Params = {
      Bucket: bucketName,
      Key: objectKey
    };

    const result = await this.deleteObject(params);

    return Promise.resolve(result.DeleteMarker);
  }

  public async copySourceObject(
    bucketName: string,
    keys: { source: string; target: string }
  ): Promise<boolean> {
    const params: AwsCopyObjectParams = {
      Bucket: bucketName,
      CopySource: `${bucketName}/${keys.source}`,
      Key: keys.target
    };

    const result = await this.copyObject(params);

    if (result.CopyObjectResult) {
      return Promise.resolve(true);
    }

    return Promise.resolve(false);
  }

  public formatObjectKey(id: number, folderName: string, objectName: string): string {
    return `${S3_ENV_FOLDER}/${id}/${folderName}/${objectName}`;
  }

  private async getSignedUrl(operation: string, params: AwsSignedUrlParams): Promise<string> {
    return new Promise((resolve, reject) => {
      this.s3.getSignedUrl(operation, params, (err, url) => {
        if (err) {
          reject(err);
        }
        resolve(url);
      });
    });
  }

  private async deleteObject(params: AwsS3Params): Promise<S3.DeleteObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.deleteObject(params, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve(result);
      });
    });
  }

  private async copyObject(params: AwsCopyObjectParams): Promise<S3.CopyObjectOutput> {
    return new Promise((resolve, reject) => {
      this.s3.copyObject(params, (err, result) => {
        if (err) {
          console.log(params);
          reject(err);
        }
        resolve(result);
      });
    });
  }
}
