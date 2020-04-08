import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import ChannelSelect from '../ChannelSelect';

function Header() {

  return (
    <Flex direction="row">
      <Heading flex={3}>OpenTok Karaoke</Heading>
      <ChannelSelect />
    </Flex>
  )
};

export default Header;