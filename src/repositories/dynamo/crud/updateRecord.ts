import type { DynamoDB } from 'aws-sdk'
import type { Record } from 'repositories'
import {
  createExpressionAttributeNames,
  createExpressionAttributeValues,
  createUpdateExpression,
} from 'repositories/dynamo/utils'

export const updateRecord = async <T extends Record>({
  db,
  tableName,
  data,
  conditionExpression,
  restAttributeValues = {},
}: {
  db: DynamoDB.DocumentClient
  tableName: string
  data: T
  conditionExpression?: string
  restAttributeValues?: any
}): Promise<T> => {
  const { id, ...rest } = data
  const { Attributes: item } = await db
    .update({
      TableName: tableName,
      Key: {
        id,
      },
      ExpressionAttributeNames: createExpressionAttributeNames(rest),
      ExpressionAttributeValues: {
        ...createExpressionAttributeValues(rest),
        ...restAttributeValues,
      },
      UpdateExpression: createUpdateExpression(rest),
      ConditionExpression: conditionExpression || 'attribute_exists(id)',
      ReturnValues: 'UPDATED_NEW',
    })
    .promise()
  return { ...item, id } as T
}
