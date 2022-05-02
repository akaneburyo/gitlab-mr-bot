import type { BotType } from 'api/@types'

// ----------------------------------------------------------------------------
// データベースのエンティティ定義
// ----------------------------------------------------------------------------

export type Identifier = number | string

export type Record = {
  id?: Identifier
}

export type ReadResult<T extends Record> = {
  items: Array<T>
  next?: Identifier
}

// Bot
export type BotEntity = {
  name: string
  notificationTo: string
  createdAt: number
  lastUsed?: number
  type: BotType

  title?: string
  message?: string
  commitListTitle?: string
} & Record
