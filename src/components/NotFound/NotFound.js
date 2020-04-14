import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import { CreateRoomButton } from '../CreateRoom';

function NotFound() {
  return (
    <Flex
      color="white"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <Heading fontSize="10em">UH OH!</Heading>
      <Heading fontSize="4em" mb=".75em">You went to the wrong place!</Heading>
      <CreateRoomButton />
    </Flex> 
  )
}

export default NotFound;