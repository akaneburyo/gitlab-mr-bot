import type { NextApiRequest, NextApiResponse } from 'next'
import { botRead } from 'service/bot'
import { defaultDataProvider } from 'repositories'
import { isObject, replaceTemplate } from 'utils'
import { privateConfig, publicConfig } from 'constants/config'

import axios from 'axios'

type ApiParams<ResT> = {
  req: NextApiRequest
  res: NextApiResponse<ResT>
}

type User = {
  id?: number
  name: string
  username: string
}
type GitlabWebhookBody = {
  event_type: 'merge_request' | string
  project: {
    id: number
  }
  object_attributes: {
    id: number
    iid: number
    title: string
    url: string
    action: 'merge' | string
    assignee_id: number
    author_id: string

    target_branch: string
    source_branch: string
  }
  user: User
  assignee: User
}

type GitlabMergeRequestInfo = {
  title: string
  author: User
  assignee: User
  merged_by: User
  changes_count: string
  web_url: string
}

type GitlabCommits = {
  id: string
  title: string
  author_name: string
  short_id: string
}[]

const doNotification = async (params: ApiParams<void>) => {
  const { req, res } = params
  const { id } = req.query

  // Check existence
  const botInfo = await botRead(defaultDataProvider, { id: `${id}` }).catch(() => {
    res.status(404).json()
  })
  if (!botInfo) {
    res.status(404).json()
    return
  }

  // param parse
  const token = req.headers['x-gitlab-token']
  const body: GitlabWebhookBody = isObject(req.body) ? req.body : JSON.parse(req.body)
  if (!body || !token) throw Error('ValidationError')

  if (body.event_type !== 'merge_request' || body.object_attributes.action !== 'merge') {
    res.status(200).json()
    return
  }

  // fetch from Gitlab
  const mrInfo: GitlabMergeRequestInfo = await axios
    .get(
      `${privateConfig.gitlab.url}/api/v4/projects/${body.project.id}/merge_requests/${body.object_attributes.iid}`,
      { headers: { 'PRIVATE-TOKEN': `${token}` } }
    )
    .then((result) => result.data)

  const commits: GitlabCommits = await axios
    .get(
      `${privateConfig.gitlab.url}/api/v4/projects/${body.project.id}/merge_requests/${body.object_attributes.iid}/commits`,
      { headers: { 'PRIVATE-TOKEN': `${token}` } }
    )
    .then((result) => result.data)

  // create notification body
  const title = replaceTemplate(publicConfig.notification.type.simple.title, {
    iid: `!${body.object_attributes.iid}`,
  })
  const message = replaceTemplate(publicConfig.notification.type.simple.message, {
    iid: `[!${body.object_attributes.iid}](${mrInfo.web_url})`,
    title: mrInfo.title,
    target: body.object_attributes.target_branch,
    changesCount: mrInfo.changes_count,
    commitsCount: `${commits.length}`,
  })

  const commitList = commits.map((commit) => `- *${commit.short_id}*  ${commit.title}`).join('\\n')

  const data = replaceTemplate(publicConfig.notification.templateString, {
    title,
    message,
    commitList,
    botId: `${id}`,
    commitListTitle: publicConfig.notification.type.simple.commitListTitle,
    authorName: mrInfo.author.username,
    authorEmail: `${mrInfo.author.username}@${privateConfig.emailDomail}`,
    mergedByName: mrInfo.merged_by.username,
    mergedByEmail: `${mrInfo.merged_by.username}@${privateConfig.emailDomail}`,
  })

  // Debug
  console.log({ notificationTo: botInfo.result.notificationTo, payload: data })

  // Notify to Teams
  await axios.post(botInfo.result.notificationTo, data)
  res.status(200).json()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      await doNotification({ req, res })
    } else {
      throw new Error('Not found')
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
