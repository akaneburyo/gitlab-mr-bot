import type { VFC } from 'react'
import { useCallback } from 'react'

import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

type ModalProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  large?: boolean
}

type UseModalProps = {
  large?: boolean
}

const Modal: VFC<ModalProps> = (props) => {
  const { children, isOpen, onClose, large } = props
  return (
    <ChakraModal
      closeOnOverlayClick={false}
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      size={large ? '2xl' : 'md'}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {children}
      </ModalContent>
    </ChakraModal>
  )
}

const useModal = (props: UseModalProps | void) => {
  const { isOpen, onClose, onOpen } = useDisclosure()

  const modal = useCallback(
    ({ children }) => {
      return (
        <Modal isOpen={isOpen} onClose={onClose} large={props?.large}>
          {children}
        </Modal>
      )
    },
    [isOpen, onClose, props]
  )

  return [modal, { onOpen, onClose }] as const
}

export default useModal
