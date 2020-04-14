import React from 'react';
import { Flex, Heading, Progress } from '@chakra-ui/core';

function Loading() {
  return (

    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Flex
        bg="white"
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        borderRadius="10px"
        boxShadow="8px 8px 4px 4px #1A365D"
        p={6}
        h="20vh"
        w="30vw"
      >
        <Heading>OpenTok Karaoke</Heading>
        <Progress
          color="blue"
          hasStripe
          isAnimated
          w="50%"
          h="40px"
          value={100}
        />
      </Flex>
    </Flex>
  )
}

// Photo by BRUNO CERVERA on Unsplash
export default Loading;