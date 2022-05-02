import type { BotType } from 'api/@types'

const privateConfig = {
  database: {
    table: {
      bots: process.env.BOTS_TABLE_NAME || '',
    },
  },
  gitlab: {
    url: process.env.GITLAB_URL || '',
  },
  emailDomail: process.env.EMAIL_DOMAIN || '',
}

const publicConfig = {
  aws: {
    region: process.env.NEXT_PUBLIC_REGION || '',
  },

  protocol: process.env.NEXT_PUBLIC_PROTOCOL || '',
  notification: {
    templateString: JSON.stringify({
      type: 'message',
      attachments: [
        {
          contentType: 'application/vnd.microsoft.card.adaptive',
          content: {
            type: 'AdaptiveCard',
            body: [
              {
                type: 'TextBlock',
                size: 'Medium',
                weight: 'Bolder',
                text: '${title}',
              },
              {
                type: 'TextBlock',
                text: '${message}',
                wrap: true,
              },
              {
                type: 'TextBlock',
                wrap: true,
                size: 'Small',
                text: '${commitListTitle}',
              },
              {
                type: 'TextBlock',
                wrap: true,
                fontType: 'Monospace',
                size: 'Small',
                weight: 'Default',
                text: '${commitList}',
              },
              {
                type: 'TextBlock',
                text: 'ID: ${botId}',
                wrap: true,
                size: 'Small',
                weight: 'Lighter',
                isSubtle: true,
              },
            ],
            $schema: 'http://adaptivecards.io/schemas/adaptive-card.json',
            version: '1.0',
            msteams: {
              width: 'Full',
              entities: [
                {
                  type: 'mention',
                  text: '<at>author</at>',
                  mentioned: {
                    id: '${authorEmail}',
                    name: '${authorName}',
                  },
                },
                {
                  type: 'mention',
                  text: '<at>merged_by</at>',
                  mentioned: {
                    id: '${mergedByEmail}',
                    name: '${mergedByName}',
                  },
                },
              ],
            },
          },
        },
      ],
    }),
    type: {
      simple: {
        title: '${iid} がマージされました！！🎉🎉',
        message:
          '<at>author</at> が作成した ${iid} ${title} が <at>merged_by</at> によって${target}にマージされました！\\n\\nこのMRには ${commitsCount}個のコミット、${changesCount}個のファイルの変更)が含まれています。\\n\\nお疲れさまでした🎉\\n\\n',
        commitListTitle: '取り込まれたコミット',
      },
    },
  },

  botTypes: {
    default: {
      value: 'default' as BotType,
      name: 'default',
    },
    custom: {
      value: 'custom' as BotType,
      name: 'custom',
    },
  },
}
export { publicConfig, privateConfig }
