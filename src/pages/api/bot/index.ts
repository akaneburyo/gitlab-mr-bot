import type { NextApiRequest, NextApiResponse } from 'next'
import type { CreateBotRequest, CreateBotResponse } from 'api/@types'
import { botCreate } from 'service/bot'
import { defaultDataProvider } from 'repositories'

import { isObject } from 'utils'

type ApiParams<ResT> = {
  req: NextApiRequest
  res: NextApiResponse<ResT>
}

const doCreateBot = async (params: ApiParams<CreateBotResponse>) => {
  const { req, res } = params
  const body: CreateBotRequest = isObject(req.body) ? req.body : JSON.parse(req.body)

  if (!body) throw Error('ValidationError')

  const result = await botCreate(defaultDataProvider, {
    name: body.name,
    notificationTo: body.notificationTo,
  })
  res.status(201).json({ result })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      await doCreateBot({ req, res })
    } else {
      throw new Error('Forbidden')
    }
  } catch (e: any) {
    let status = 500
    if (e.message === 'Unauthorized') status = 401
    if (e.message === 'Forbidden') status = 403
    if (e.message === 'Unexpected end of JSON input') status = 422
    if (e.message === 'ValidationError') status = 422

    res.status(status).json({
      error: {
        message: e.message,
        status: status,
      },
    })
  }
}
