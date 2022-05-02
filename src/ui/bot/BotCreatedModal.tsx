import type { VFC } from 'react'
import { useCallback } from 'react'
import { useEffect, useMemo } from 'react'

// Chakra-UI
import { Heading, Text, Code, VStack, Box, Button, useToast } from '@chakra-ui/react'
import { ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react'
import { CopyIcon } from '@chakra-ui/icons'

// API
import { createApiClient } from 'api'

// Hooks
import useModal from 'ui/hooks/useModal'

const itemHeadingProps = {
  as: 'h4',
  size: 'sm',
  mb: 1,
} as const

type Props = {
  id?: string
  baseUrl?: string
  isOpen?: boolean
  setOpen: (value: boolean) => void
}

export const BotCreatedModal: VFC<Props> = (props) => {
  const { id, baseUrl, isOpen, setOpen } = props
  const [Modal, { onOpen, onClose }] = useModal({ large: true })

  const toast = useToast()

  useEffect(() => {
    if (isOpen) onOpen()
    else onClose()
  }, [isOpen, onOpen, onClose])

  const apiClient = useMemo(() => createApiClient(), [])
  const webhookPath = useMemo(() => {
    if (!baseUrl || !id) return ''
    return `${baseUrl}${apiClient.webhook._botId(`${id}`).$path()}`
  }, [apiClient, baseUrl, id])

  const copyPath = useCallback(() => {
    navigator.clipboard.writeText(webhookPath)
    toast({ title: 'コピーしました!' })
  }, [webhookPath, toast])

  return (
    <Modal>
      <ModalHeader>登録しました！</ModalHeader>
      <ModalBody>
        <Heading as="h3" size="md" mb={4}>
          利用を開始するには
        </Heading>
        <VStack spacing={4} mb={4} align="flex-start">
          <Box fontSize="sm">
            <Heading {...itemHeadingProps}>1. Gitlabのアクセストークンを取得する</Heading>
            <Text>
              <Code>{'User Settings > Access Tokens'}</Code>
              から、アクセストークンを取得してください。
              <br />
              (トークンは次の手順で使用します。)
              <br />
              <Code>{'Scope'}</Code>はAPIのみチェックが必要です。
            </Text>
          </Box>
          <Box fontSize="sm">
            <Heading {...itemHeadingProps}>2. リポジトリにWebHookを追加する</Heading>
            <Text>
              通知を行いたいリポジトリの
              <Code>{'Settings > Integrations Settings'}</Code>
              へ移動し、
              <br />
              <Code>{'URL'}</Code>欄に以下のURLを、<Code>{'Secret Token'}</Code>
              欄に先程取得したアクセストークンを入力し、
              <Code>Merge request events</Code>にチェックを付けてWebhookを追加してください。
            </Text>
            <InputGroup mb={1}>
              <Input fontSize="xs" value={webhookPath} readOnly onClick={copyPath} />
              <InputRightElement as="button" type="button" onClick={copyPath}>
                <CopyIcon />
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box fontSize="sm">
            <Heading {...itemHeadingProps}>3. MRをマージする</Heading>
            <Text>MRがマージされると、登録時に設定したWebhookURL宛にメッセージを通知します。</Text>
          </Box>
        </VStack>
      </ModalBody>
      <ModalFooter alignSelf="center">
        <Button
          onClick={() => {
            setOpen(false)
          }}
        >
          閉じる
        </Button>
      </ModalFooter>
    </Modal>
  )
}
