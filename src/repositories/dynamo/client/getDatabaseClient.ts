import type { DynamoDB } from 'aws-sdk'
// import { publicConfig } from 'constants/config'
import { createClient } from 'repositories/dynamo/client/createClient'
// import { createDevClient } from 'repositories/dynamo/client/createDevClient'

// TODO: ローカル動作時のクライアント生成
export const getDatabaseClient = (): DynamoDB.DocumentClient => {
  return createClient()
}
