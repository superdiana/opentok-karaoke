import React, { useEffect, } from 'react';
import { useDisclosure } from '@chakra-ui/core';
import CreateRoomModal from './CreateRoomModal';

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

export default useCreateRoomModal;