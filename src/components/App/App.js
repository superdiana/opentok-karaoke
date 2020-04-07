import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/core';
import Header from '../Header';

function App() {

  return (
    <Flex direction="column" h="100vh">
      <Box bg="gray.800" w="100vw" color="white">
        <Header />
      </Box>
      <Flex direction="row" bg="gray.200" w="100vw" color="white" flex="1">
        <Box bg="green.900" flexBasis="70vw" color="white"><Heading>video</Heading></Box>
        <Box bg="red.900" color="white" flex="1"><Heading>Playlist</Heading></Box>
      </Flex>
      <Box bg="gray.900" w="100vw" h="20vh" color="white"><Heading>Queue</Heading></Box>
    </Flex>
  )
};


export default App;
