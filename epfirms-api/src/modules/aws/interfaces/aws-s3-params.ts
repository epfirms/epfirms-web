export interface AwsS3Params {
  Bucket: string;
  Key: string;
}

export interface AwsSignedUrlParams extends AwsS3Params {
  Expires: number;
  ACL?: string;
  ContentType?: string;
}

export interface AwsCopyObjectParams extends AwsS3Params {
  CopySource: string;
}
