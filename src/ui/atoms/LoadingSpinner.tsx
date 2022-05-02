import type { VFC } from 'react'
import { useEffect } from 'react'

import { Modal, ModalContent, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'

interface Props {
  isLoading?: boolean
}

const LoadingSpinner: VFC<Props> = ({ isLoading = false }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {
    isLoading ? onOpen() : onClose()
  }, [isLoading, onOpen, onClose])

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      closeOnEsc={false}
      closeOnOverlayClick={false}
    >
      <ModalOverlay />
      <ModalContent bgColor="transparent" boxShadow="none">
        <Center>
          <Spinner size="xl" color="main.500" />
        </Center>
      </ModalContent>
    </Modal>
  )
}

export default LoadingSpinner
