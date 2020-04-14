import React from 'react';
import { Flex, Skeleton} from '@chakra-ui/core';

function Playlist() {

  return (
    <Flex
      direction="column"
      maxH="calc(100% - 1rem)"
      alignItems="center"
      overflow="scroll"
      p={4}
    >
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
    </Flex>
  )
};

export default Playlist;