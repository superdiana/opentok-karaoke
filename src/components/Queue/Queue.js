import React from 'react';
import { Flex, Skeleton } from '@chakra-ui/core';

function Queue() {

  return (
    <Flex direction="row">
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="100px" width="100px" m="10px" />
    </Flex>
  )
};

export default Queue;