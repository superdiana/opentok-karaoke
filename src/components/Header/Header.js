import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import { CreateRoomButton } from '../CreateRoom';

function Header() {

  return (
    <Flex direction="row">
      <Heading flex={3}>OpenTok Karaoke</Heading>
      <CreateRoomButton />
    </Flex>
  )
};

export default Header;