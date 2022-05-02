import { DynamoDB } from 'aws-sdk'
import { publicConfig } from 'constants/config'

// TODO: デプロイしての動作確認が未確認の為、設定が足りない可能性がある

export const createClient = () => {
  return new DynamoDB.DocumentClient({
    region: publicConfig.aws.region,
  })
}
