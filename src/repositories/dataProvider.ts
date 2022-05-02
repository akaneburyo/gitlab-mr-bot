import type { ReadResult, Record, Identifier } from 'repositories/types'

export type DataProvider = {
  create: <T extends Record>(resource: string, data: T) => Promise<T>
  read: <T extends Record>(
    resource: string,
    key: string,
    start?: Identifier,
    filter?: Partial<T>
  ) => Promise<ReadResult<T>>
  update: <T extends Record>(resource: string, data: T, extra?: any) => Promise<T>
  delete: (resource: string, id: Identifier) => Promise<void>
}
