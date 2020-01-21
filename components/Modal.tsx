import {
  Button,
  Flex,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/core'
import React from 'react'

interface Props {}

const Modal: React.FC<Props> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex>Modal content</Flex>
        </ModalBody>

        <ModalFooter>
          <Button variantColor='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant='ghost'>Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
