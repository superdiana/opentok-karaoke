import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

import Header from '../Header';
import Playlist from '../Playlist';
import Queue from '../Queue';
import Video from '../Video';

function App() {

  return (
    <Flex direction="column" h="100vh">
      <Box bg="gray.800" w="100vw" color="white">
        <Header />
      </Box>
      <Flex direction="row" bg="gray.200" w="100vw" color="white" flex="1">
        <Box bg="green.900" flexBasis="70vw" color="white">
          <Video />
        </Box>
        <Box bg="red.900" color="white" flex="1">
          <Playlist />
        </Box>
      </Flex>
      <Box bg="gray.900" w="100vw" h="20vh" color="white">
        <Queue />
      </Box>
    </Flex>
  )
};


export default App;
