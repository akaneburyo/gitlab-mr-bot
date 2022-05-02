import type { NextApiRequest, NextApiResponse } from 'next'
import type { BotType, GetBotResponse, UpdateBotRequest, UpdateBotResponse } from 'api/@types'
import { botRead, botUpdate, botDelete } from 'service/bot'
import { defaultDataProvider } from 'repositories'
import { isObject } from 'utils'

type ApiParams<ResT> = {
  req: NextApiRequest
  res: NextApiResponse<ResT>
}

const doReadBot = async (params: ApiParams<GetBotResponse>) => {
  const { req, res } = params
  const { id } = req.query

  if (!id) throw Error('ValidationError')

  const result = await botRead(defaultDataProvider, { id: `${id}` }).then((result) => result.result)
  const type = result.type as BotType
  res.status(200).json({ result: { ...result, id: `${id}`, type } })
}

const doUpdateBot = async (params: ApiParams<UpdateBotResponse>) => {
  const { req, res } = params
  const { id } = req.query

  const body: UpdateBotRequest = isObject(req.body) ? req.body : JSON.parse(req.body)
  if (!id || !body) throw Error('ValidationError')

  console.log(body)
  await botUpdate(defaultDataProvider, { ...body, id: `${id}` })
  res.status(201).json({ result: { id: `${id}` } })
}

const doDeleteBot = async (params: ApiParams<UpdateBotResponse>) => {
  const { req, res } = params
  const { id } = req.query
  if (!id) throw Error('ValidationError')

  await botDelete(defaultDataProvider, { id: `${id}` })
  res.status(200).json({ result: { id: `${id}` } })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'GET') {
      await doReadBot({ req, res })
    } else if (req.method === 'PUT') {
      await doUpdateBot({ req, res })
    } else if (req.method === 'DELETE') {
      await doDeleteBot({ req, res })
    } else {
      throw new Error('Forbidden')
    }
  } catch (e: any) {
    let status = 500
    if (e.message === 'Unauthorized') status = 401
    if (e.message === 'Forbidden') status = 403
    if (e.message === 'Not found') status = 404
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
