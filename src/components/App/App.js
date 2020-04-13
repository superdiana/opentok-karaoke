import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useParams } from "react-router-dom";
import Playlist from '../Playlist';
import Queue from '../Queue';
import Video from '../Video';

function App() {
  let { id } = useParams();
  console.log(id);
  return (
    <>
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
    </>
  )
};


export default App;
