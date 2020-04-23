import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import { useRoom } from '../../contexts/room';

function Header() {
  const { room } = useRoom();
  const { result} = room;
  return (
    <Flex direction="row" alignContent="center">
      <Heading as="h1" flex={3}>OpenTok Karaoke</Heading>
      <Heading as="h2" size="lg" lineHeight="2.25" textAlign="right" flex={1}>{result?.data.data[0].room_name}</Heading>
    </Flex>
  )
};

export default Header;