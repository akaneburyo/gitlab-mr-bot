import type { DynamoDB } from 'aws-sdk'

export const insertRecord = async <T>({
  db,
  tableName,
  data,
}: {
  db: DynamoDB.DocumentClient
  tableName: string
  data: T
}): Promise<T> => {
  await db
    .put({
      TableName: tableName,
      Item: data,
    })
    .promise()
  return data
}
