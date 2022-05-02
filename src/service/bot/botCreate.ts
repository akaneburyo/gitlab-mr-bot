import type { DataProvider, BotEntity } from 'repositories'
import type { BotCreateParams, BotCreateResult } from 'service/bot/types'
import { createUUID } from 'utils/createUUID'
import { privateConfig } from 'constants/config'

export const botCreate = async (
  dataProvider: DataProvider,
  params: BotCreateParams
): Promise<BotCreateResult> => {
  const resource = privateConfig.database.table.bots

  const data: BotEntity = {
    ...params,
    id: createUUID(),
    createdAt: ~~(new Date().getTime() / 1000),
    type: 'default',
  }

  await dataProvider.create<BotEntity>(resource, data).catch((e) => console.log(e))
  return { id: data.id as string }
}
