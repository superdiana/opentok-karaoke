import React, { useEffect, useRef } from 'react';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";

function CreateRoomModal({visible, toggle}) {
  const focus = useRef();

  return (
    <Modal
      isOpen={visible}
      onClose={toggle}
      isCentered={true}
      initialFocusRef={focus}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Karaoke Room</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={10} >
            <FormLabel htmlFor="playlistId">YouTube Playlist</FormLabel>
            <Input ref={focus} id="playlistId" />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="roomName">Room Name</FormLabel>
            <Input id="roomName" />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button variantColor="blue">Create Room</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

function useCreateRoomModal(visible = false) {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  useEffect(() => {
    if (visible) onOpen();
  }, [visible, onOpen])

  const modal = <CreateRoomModal visible={isOpen} toggle={onToggle} />;
  
  return {
    modal,
    toggle: onToggle
  }
}

export {
  useCreateRoomModal,
  CreateRoomModal
};