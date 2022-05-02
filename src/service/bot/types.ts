import type { BotType } from 'aws-sdk/clients/chime'
// --------------------------------
// Bot
// --------------------------------
export type Bot = {
  id?: string
  name: string
  notificationTo: string
  createdAt: number
  type: BotType
}

// --------------------------------
// Bot - create
// --------------------------------
export const BotCreateRequireKeys: Array<keyof BotCreateParams> = ['name', 'notificationTo']
export const BotCreatePickKeys: Array<keyof BotCreateParams> = ['name', 'notificationTo']

export type BotCreateParams = {
  name: string
  notificationTo: string
}

export type BotCreateResult = {
  id: string
}

// --------------------------------
// Bot - read
// --------------------------------
export const BotReadRequireKeys: Array<keyof BotReadParams> = ['id']
export const BotReadPickKeys: Array<keyof BotReadParams> = ['id']
export type BotReadParams = {
  id: string
}

export type BotReadResult = {
  result: Bot
}

// --------------------------------
// Bot - update
// --------------------------------
export const BotUpdateRequireKeys: Array<keyof BotUpdateParams> = ['name', 'notificationTo']
export const BotUpdatePickKeys: Array<keyof BotUpdateParams> = ['name', 'notificationTo']

export type BotUpdateParams = {
  id: string
  name: string
  notificationTo: string
}

export type BotUpdateResult = {
  id: string
}

// --------------------------------
// Bot - delete
// --------------------------------
export const BotDeleteRequireKeys: Array<keyof BotDeleteParams> = []
export const BotDeletePickKeys: Array<keyof BotDeleteParams> = ['id']

export type BotDeleteParams = {
  id: string
}

export type BotDeleteResult = {
  id: string
}
