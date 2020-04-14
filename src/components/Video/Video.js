import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/core';

function Video() {

  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Skeleton
        colorStart="#EBF8FF"
        colorEnd="#CEEDFF"
        h="80%"
        w="80%"
        m="10px"
      />
    </Flex>
  )
};

export default Video;