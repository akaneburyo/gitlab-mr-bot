/* eslint-disable */
export type BotType = 'default' | 'custom'

export type Bot = {
  id?: string | undefined
  name: string
  notificationTo: string
  createdAt?: number | undefined
  type: BotType
  title?: string | undefined
  message?: string | undefined
  commitListTitle?: string | undefined
}

export type GetBotResponse = {
  result: Bot
}

export type CreateBotRequest = Bot

export type CreateBotResponse = {
  result: {
    id?: string | undefined
  }
}

export type UpdateBotRequest = Bot

export type UpdateBotResponse = {
  result: {
    id?: string | undefined
  }
}

export type DeleteBotResponse = {
  result: {
    id?: string | undefined
  }
}
