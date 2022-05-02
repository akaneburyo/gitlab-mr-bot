import { useCallback, useState } from 'react'
import type { NextPage } from 'next'

import Head from 'next/head'

// Chakra-UI
import { Container, Box, Heading } from '@chakra-ui/react'

// Components
import { BotForm } from 'ui/bot/BotForm'
import type { BotFormValues } from 'ui/bot/BotForm'
import { BotEditForm } from 'ui/bot/BotEditForm'
import { BotCreatedModal } from 'ui/bot/BotCreatedModal'

// hooks
import useBots from 'ui/hooks/useBots'

// Constants
import { publicConfig } from 'constants/config'

type Props = {
  baseUrl?: string
}

const Index: NextPage<Props> = ({ baseUrl }) => {
  const { create, checkExist, update, getInfo, deleteBot } = useBots()
  const [createdModalIsOpen, setCreatedModalOpen] = useState<boolean>()
  const [createdBotId, setCreatedBotId] = useState<string>()

  const onSubmit = useCallback(
    async (values: BotFormValues) => {
      await create({ ...values, type: 'default' }).then((result) => {
        setCreatedModalOpen(true)
        setCreatedBotId(result.result.id)
      })
    },
    [create]
  )

  const onSave = useCallback(
    async (values: BotFormValues, id: string) => {
      await update({ ...values, id, type: 'default' })
    },
    [update]
  )

  const onCheck = useCallback(
    async (id) => {
      if (!(await checkExist(id))) throw Error()
      return await getInfo(id)
    },
    [checkExist, getInfo]
  )

  const onDelete = useCallback(
    async (id) => {
      await deleteBot(id).then()
    },
    [deleteBot]
  )

  return (
    <div>
      <Head>
        <title>Gitlab Bot</title>
      </Head>
      <Container maxW="container.md" py={10}>
        <Heading as="h1" mb={6} textAlign="center">
          Gitlab Bot
        </Heading>
        <Box p={6} mb={8} borderRadius="8px" boxShadow="base">
          <BotForm onSubmit={onSubmit} option={{ formTitle: '新規作成' }} />
        </Box>
        <Box bgColor="gray.100" h="1px" w="100%" mb={8} />

        <Box p={6} mb={8} borderRadius="8px" boxShadow="base">
          <BotEditForm onCheck={onCheck} onSave={onSave} onDelete={onDelete} />
        </Box>
      </Container>
      <BotCreatedModal
        isOpen={createdModalIsOpen}
        setOpen={setCreatedModalOpen}
        id={createdBotId}
        baseUrl={baseUrl}
      />
    </div>
  )
}

Index.getInitialProps = ({ req }) => {
  let baseUrl
  if (req) {
    baseUrl = `${publicConfig.protocol}://${req.headers.host}`
  } else {
    baseUrl = `${window.location.protocol}://${window.location.hostname}`
  }
  return { baseUrl }
}

export default Index
