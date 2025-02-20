import * as Minio from 'minio'
import * as stream from 'node:stream'

export class MinIoHandler {
  private minioClient: Minio.Client

  constructor() {
    this.minioClient = new Minio.Client({
      accessKey: process.env.MINIO_KEY,
      endPoint: 's3-1-api.abrian.cloud' /*process.env.MINIO_ENDPOINT!,*/,
      region: 'eu-central-1',
      secretKey: process.env.MINIO_SECRET,
      useSSL: true,
    })
  }
  async ensureBucket() {
    const bucketName = String(process.env.MINIO_BUCKET)
    const exists = await this.minioClient.bucketExists(bucketName)

    console.log(exists)

    if (!exists) {
      console.log(`Bucket "${bucketName}" does not exist. Creating...`)
      await this.minioClient.makeBucket(bucketName, 'us-east-1')
      console.log(`Bucket "${bucketName}" created successfully.`)
    }
  }

  async presignURL(target: string): Promise<string | undefined> {
    try {
      return await this.minioClient.presignedUrl('GET', String(process.env.MINIO_BUCKET), target)
    } catch (e: any) {
      throw new Error(e)
    }
  }

  async uploadMinIO(target: string, file: Buffer | stream.Readable) {
    try {
      await this.ensureBucket()
      await this.minioClient.putObject(String(process.env.MINIO_BUCKET), target, file)
    } catch (e) {
      console.log(e)
      throw e
    }
  }
}
