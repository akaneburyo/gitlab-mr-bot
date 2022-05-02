import type { DataProvider, BotEntity } from 'repositories'
import type { BotReadParams, BotReadResult } from 'service/bot/types'
import { privateConfig } from 'constants/config'

export const botRead = async (
  dataProvider: DataProvider,
  params: BotReadParams
): Promise<BotReadResult> => {
  const resource = privateConfig.database.table.bots
  const result = await dataProvider.read<BotEntity>(resource, 'id', undefined, {
    id: params.id,
  })
  const bot = result.items.shift()
  if (!bot) throw new Error('Not found')
  return {
    result: { ...bot, id: `${bot.id}` },
  }
}
