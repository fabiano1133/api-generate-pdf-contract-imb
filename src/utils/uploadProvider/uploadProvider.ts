import fs from 'fs';
import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { dateProvider } from '../dateProvider/dateProvider';

export async function uploadProvider(filePath: string): Promise<any> {

    const fileContent = fs.readFileSync(filePath);

        const params = {
            Bucket: `${process.env.AWS_BUCKET_NAME}`,
            Key: `${uuidv4()}-${dateProvider.date}.pdf`, // File name you want to save as in S3
            Body: fileContent,
            ContentType:'application/pdf',
        }

        const s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });

       const file = await s3.upload(params, async (err: any, data: any) => {
            if (err) {
                return err;
            } else {
                console.log(data);

            }
        }).promise();

        const result = s3.getSignedUrl('getObject', {
            Bucket: `${process.env.AWS_BUCKET_NAME}`,
            Key: file.Key,
        })

        return result.toString()      
}