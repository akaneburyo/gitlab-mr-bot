import type { VFC } from 'react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

// Chakra-UI
import { HStack, Box } from '@chakra-ui/react'
import { Heading, Button } from '@chakra-ui/react'
import { ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react'

// Components
import { InputWithHelp } from 'ui/atoms/InputWithHelp'
import { BotForm } from 'ui/bot/BotForm'
import type { BotFormValues } from 'ui/bot/BotForm'

// Type
import type { Bot } from 'ui/hooks/useBots'

// Hooks
import useModal from 'ui/hooks/useModal'

type IdFormValues = {
  id: string
}

export type Props = {
  onCheck: (id: string) => Promise<Bot>
  onSave: (values: BotFormValues, id: string) => Promise<void>
  onDelete: (id: string) => Promise<void>
}

export const BotEditForm: VFC<Props> = (props) => {
  const { onCheck, onSave, onDelete } = props

  const {
    control: idFormControl,
    handleSubmit: idFormHandle,
    reset: idFormReset,
    formState: { isValid: idFormIsValid },
  } = useForm<IdFormValues>({
    mode: 'onBlur',
  })

  const [isChecking, setChecking] = useState<boolean>(false)
  const [isDeleting, setDeleting] = useState<boolean>(false)
  const [editing, setEditing] = useState<Bot>()
  const [DeleteConfirmModal, { onOpen: deleteConfirmModalOpen, onClose: deleteConfirmModalClose }] =
    useModal()

  const onCheckNotify = useCallback(
    (values: IdFormValues) => {
      setChecking(true)
      onCheck(values.id)
        .then((bot) => {
          setEditing(bot)
        })
        .finally(() => {
          setChecking(false)
        })
    },
    [onCheck]
  )

  const onSaveNotify = useCallback(
    async (values: BotFormValues) => {
      await onSave(values, editing?.id || '').then(() => {
        setEditing(undefined)
        idFormReset({ id: '' })
      })
    },
    [onSave, idFormReset, editing]
  )

  const onCancel = useCallback(() => {
    setEditing(undefined)
    idFormReset({ id: '' })
  }, [idFormReset])

  const onDeleteNotify = useCallback(() => {
    if (!editing || !editing.id) return
    setDeleting(true)
    onDelete(editing.id)
      .then(() => deleteConfirmModalClose())
      .finally(() => setDeleting(false))
  }, [editing, onDelete, deleteConfirmModalClose])

  return (
    <Box>
      <Heading as="h3" size="md" mb={2}>
        編集
      </Heading>
      <form onSubmit={idFormHandle(onCheckNotify)}>
        <HStack>
          <InputWithHelp
            control={idFormControl}
            name="id"
            placeholder="ID"
            information="登録時に発行されたIDを入力してください。(送信される通知の最下部にも記載があります)"
            rules={{ required: true }}
            isDisabled={!!editing}
          />
          <Button type="submit" isLoading={isChecking} isDisabled={!!editing || !idFormIsValid}>
            編集
          </Button>
        </HStack>
      </form>

      {editing && (
        <BotForm
          onSubmit={onSaveNotify}
          onCancel={onCancel}
          onDelete={deleteConfirmModalOpen}
          option={{
            submitButtonTitle: '保存',
            isCancelEnabled: true,
            isDeleteEnabled: true,
            defaultValue: { name: editing.name, notificationTo: editing.notificationTo },
          }}
        />
      )}

      <DeleteConfirmModal>
        <ModalHeader>確認</ModalHeader>
        <ModalBody>削除してよろしいですか？</ModalBody>
        <ModalFooter>
          <HStack>
            <Button onClick={deleteConfirmModalClose}>キャンセル</Button>
            <Button colorScheme="red" onClick={onDeleteNotify} isLoading={isDeleting}>
              削除
            </Button>
          </HStack>
        </ModalFooter>
      </DeleteConfirmModal>
    </Box>
  )
}
