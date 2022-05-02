import type { DynamoDB } from 'aws-sdk'
import {
  createExpressionAttributeNames,
  createExpressionAttributeValues,
  createReadExpression,
} from 'repositories/dynamo/utils'

import type { ReadResult, Identifier } from 'repositories/types'

export const readRecordByFilter = async <T>({
  db,
  tableName,
  key,
  start,
  filter,
}: {
  db: DynamoDB.DocumentClient
  key: string
  start?: Identifier
  tableName: string
  filter?: any
}): Promise<ReadResult<T>> => {
  const { Items: items, LastEvaluatedKey: next } = await db
    .scan({
      TableName: tableName,
      FilterExpression: createReadExpression(filter),
      ExpressionAttributeNames: createExpressionAttributeNames(filter),
      ExpressionAttributeValues: createExpressionAttributeValues(filter),
      ExclusiveStartKey: start ? { [key]: start } : undefined,
    })
    .promise()

  return { items: items as Array<T>, next: next && (next[key] as Identifier) }
}
