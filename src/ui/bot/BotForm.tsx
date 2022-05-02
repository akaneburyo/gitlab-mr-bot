import type { VFC } from 'react'
import { useCallback, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

// Chakra-UI
import { HStack, VStack } from '@chakra-ui/react'
import { Heading, Button } from '@chakra-ui/react'

// Components
import { InputWithHelp } from 'ui/atoms/InputWithHelp'

export type BotFormValues = {
  name: string
  notificationTo: string
}

export type Props = {
  onSubmit: (values: BotFormValues) => Promise<void>
  onCancel?: () => void
  onDelete?: () => void

  option?: Partial<{
    formTitle: string
    submitButtonTitle: string
    isCancelEnabled: boolean
    cancelButtonTitle: string

    isDeleteEnabled: boolean
    deleteButtonTitle: string

    defaultValue: BotFormValues
  }>
}

export const BotForm: VFC<Props> = (props) => {
  const { onSubmit, onCancel, onDelete, option } = props
  const {
    formTitle,
    submitButtonTitle,
    isCancelEnabled,
    cancelButtonTitle,
    isDeleteEnabled,
    deleteButtonTitle,
    defaultValue,
  } = option || {}

  const [submiting, setSubmiting] = useState<boolean>(false)
  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<BotFormValues>({ mode: 'onBlur' })

  const onSibmitNotify = useCallback(
    (values: BotFormValues) => {
      setSubmiting(true)
      onSubmit(values)
        .then(() => reset({ name: '', notificationTo: '' }))
        .finally(() => setSubmiting(false))
    },
    [onSubmit, reset]
  )

  useEffect(() => {
    reset(defaultValue)
  }, [defaultValue, reset])

  return (
    <form onSubmit={handleSubmit(onSibmitNotify)}>
      <Heading as="h3" size="md" mb={2}>
        {formTitle}
      </Heading>
      <VStack align="flex-end" spacing={4}>
        <InputWithHelp
          control={control}
          rules={{ required: true }}
          name="name"
          placeholder="Name"
          information="作成するBotにつける名前を入力してください。※通知には表示されません。"
        />
        <InputWithHelp
          control={control}
          rules={{ required: true }}
          name="notificationTo"
          placeholder="Webhook URL"
          information="チャネルに「Incoming Webhook」のコネクタを追加し、発行されたURLを入力してください。"
        />

        <HStack align="flex-end" spacing={4}>
          {isCancelEnabled && (
            <Button type="button" variant="outline" onClick={onCancel}>
              {cancelButtonTitle || 'キャンセル'}
            </Button>
          )}

          {isDeleteEnabled && (
            <Button type="button" variant="outline" colorScheme="red" onClick={onDelete}>
              {deleteButtonTitle || '削除'}
            </Button>
          )}

          <Button type="submit" variant="solid" isLoading={submiting} disabled={!isValid}>
            {submitButtonTitle || '登録'}
          </Button>
        </HStack>
      </VStack>
    </form>
  )
}
