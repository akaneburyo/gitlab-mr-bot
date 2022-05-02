import type { DataProvider } from 'repositories/dataProvider'
import { dynamoDataProvider } from 'repositories/dynamo'

export const defaultDataProvider: DataProvider = dynamoDataProvider
