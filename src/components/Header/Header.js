import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';

function Header() {
  return (
    <Flex direction="row">
      <Heading flex={3}>OpenTok Karaoke</Heading>
    </Flex>
  )
};

export default Header;