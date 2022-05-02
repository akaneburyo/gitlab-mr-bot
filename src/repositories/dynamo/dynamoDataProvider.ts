import type { DynamoDB } from 'aws-sdk'
import type { DataProvider, Record, Identifier } from 'repositories'
import { getDatabaseClient } from 'repositories/dynamo/client'
import {
  insertRecord,
  readRecordByFilter,
  updateRecord,
  deleteRecordById,
} from 'repositories/dynamo/crud'

const db: DynamoDB.DocumentClient = getDatabaseClient()

export const dynamoDataProvider: DataProvider = {
  create: async <T extends Record>(resource: string, data: T) => {
    return insertRecord<T>({
      db,
      tableName: resource,
      data: {
        ...data,
      },
    })
  },
  read: async <T extends Record>(
    resource: string,
    key: string,
    start?: Identifier,
    filter?: Partial<T>
  ) => readRecordByFilter({ db, tableName: resource, key, start, filter }),
  update: async <T extends Record>(resource: string, data: T, extra?: any) =>
    updateRecord({
      db,
      tableName: resource,
      data,
      conditionExpression: extra?.condition,
      restAttributeValues: extra?.attributeValues,
    }),
  delete: async (resource: string, id: Identifier) =>
    deleteRecordById({ db, tableName: resource, id }),
}
