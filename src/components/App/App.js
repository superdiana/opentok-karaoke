import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

import Header from '../Header';
import Playlist from '../Playlist';
import Queue from '../Queue';
import Video from '../Video';

function App() {

  return (
    <Flex direction="column" h="100vh">
      <Box bg="gray.800" maxW="100vw" p={4} color="white">
        <Header />
      </Box>
      <Flex direction="row" bg="gray.200" w="100vw" color="white" flex="1 1 70vh" overflow="hidden">
        <Box bg="green.900" flexBasis="80vw" color="white" p={4}>
          <Video />
        </Box>
        <Box bg="red.900" color="white" maxH="100%" flex="1">
          <Playlist />
        </Box>
      </Flex>
      <Box bg="gray.900" maxW="100vw" maxH="30vh" p={4} color="white">
        <Queue />
      </Box>
    </Flex>
  )
};


export default App;
