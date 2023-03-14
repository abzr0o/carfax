import { GetObjectRequest, PutObjectRequest } from "aws-sdk/clients/s3";
import fs, { createReadStream } from "fs";
import multer from "multer";
import path from "path";
import util from "util";
import S3 from "aws-sdk/clients/s3";

export const region = process.env.BucketRegion as string;
export const accessKeyId = process.env.AccessKey as string;
export const secretAccessKey = process.env.secrete as string;
export const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });
export default upload;
export const Bucket = process.env.BucketName as string;
const unlink = util.promisify(fs.unlink);
const uploadfileToS3 = (file: Express.Multer.File, name: string) => {
  const uploadParams: PutObjectRequest = {
    Bucket,
    Key: name + "." + file.mimetype.split("/")[1],
    Body: file.buffer,
    ContentType: file.mimetype,
  };
  return new Promise((res, rej) => {
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    });
  });
};

const downloadFromS3 = (Key: string) => {
  const downloadParams: GetObjectRequest = {
    Bucket,
    Key,
  };
  return s3.getObject(downloadParams).createReadStream();
};

export { uploadfileToS3, downloadFromS3, unlink };
