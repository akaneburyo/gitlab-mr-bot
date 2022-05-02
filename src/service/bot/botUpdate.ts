import type { DataProvider, BotEntity } from 'repositories'
import type { BotUpdateParams, BotUpdateResult } from 'service/bot/types'
import { privateConfig } from 'constants/config'

export const botUpdate = async (
  dataProvider: DataProvider,
  params: BotUpdateParams
): Promise<BotUpdateResult> => {
  const resource = privateConfig.database.table.bots

  const data: BotEntity = {
    ...params,
    createdAt: ~~(new Date().getTime() / 1000),
    type: 'default',
  }

  await dataProvider.update<BotEntity>(resource, data, {}).catch((e) => console.log(e))
  return { id: data.id as string }
}
