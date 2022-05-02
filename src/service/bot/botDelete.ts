import type { DataProvider } from 'repositories'
import type { BotDeleteParams, BotDeleteResult } from 'service/bot/types'
import { privateConfig } from 'constants/config'

export const botDelete = async (
  dataProvider: DataProvider,
  { id }: BotDeleteParams
): Promise<BotDeleteResult> => {
  const resource = privateConfig.database.table.bots
  await dataProvider.delete(resource, id)

  return { id }
}
