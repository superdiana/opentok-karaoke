import React from 'react';
import { Button } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRoom } from '../../contexts/room';

function CreateRoomButton() {
  const { openModal: open } = useRoom();
  return (
    <>
      <Button
        display="flex"
        direction="row"
        w="22vh"
        justifyContent="space-between"
        variantColor="blue"
        onClick={open}
      >
        <FontAwesomeIcon icon={faPlus} />
        Create New Room
      </Button>
    </>
  )
}

export default CreateRoomButton;
