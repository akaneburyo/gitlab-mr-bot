import type { DynamoDB } from 'aws-sdk'
import type { Identifier } from 'repositories'

export const deleteRecordById = async ({
  db,
  tableName,
  id,
}: {
  db: DynamoDB.DocumentClient
  tableName: string
  id: Identifier
}): Promise<void> => {
  await db
    .delete({
      TableName: tableName,
      Key: {
        id,
      },
    })
    .promise()
}
