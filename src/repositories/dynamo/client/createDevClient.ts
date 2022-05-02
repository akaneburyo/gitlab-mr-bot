import { config as awsConfig, DynamoDB } from 'aws-sdk'
import { publicConfig } from 'constants/config'

export const createDevClient = () => {
  // Keyは適当でOK
  awsConfig.update({
    accessKeyId: 'test',
    secretAccessKey: 'test',
  })
  return new DynamoDB.DocumentClient({
    region: publicConfig.aws.region,
    endpoint: 'http://localhost:8000', // ローカル起動時は設定が必要
  })
}
