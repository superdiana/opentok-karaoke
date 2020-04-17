import React from 'react';
import { Button } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useCreateRoomModal from './useCreateRoomModal';

function CreateRoomButton() {
  const {modal, toggle} = useCreateRoomModal();
  return (
    <>
      {modal}
      <Button
        display="flex"
        direction="row"
        w="22vh"
        justifyContent="space-between"
        variantColor="blue"
        onClick={toggle}
      >
        <FontAwesomeIcon icon={faPlus} />
        Create New Room
      </Button>
    </>
  )
}

export default CreateRoomButton;
