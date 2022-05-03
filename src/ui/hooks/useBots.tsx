import { useCallback, useMemo } from 'react'

// API
import { createApiClient } from 'api'
import type { Bot } from 'api/@types'

export { Bot }

const useBots = () => {
  const apiClient = useMemo(() => createApiClient(), [])

  const create = useCallback(
    (bot: Bot) => {
      return apiClient.bot.$post({ body: bot })
    },
    [apiClient]
  )

  const update = useCallback(
    (bot: Bot) => {
      if (!bot.id) return
      return apiClient.bot._botId(bot.id).$put({ body: bot })
    },
    [apiClient]
  )

  const checkExist = useCallback(
    async (id: string) => {
      return apiClient.bot
        ._botId(id)
        .$get()
        .then(() => true)
        .catch(() => false)
    },
    [apiClient]
  )

  const getInfo = useCallback(
    async (id: string) => {
      return apiClient.bot
        ._botId(id)
        .$get()
        .then((result) => result.result)
    },
    [apiClient]
  )

  const deleteBot = useCallback(
    async (id: string) => {
      return apiClient.bot
        ._botId(id)
        .$delete()
        .then((result) => result.result)
    },
    [apiClient]
  )

  return { create, update, checkExist, getInfo, deleteBot } as const
}

export default useBots
