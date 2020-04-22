import React, { useEffect, useRef } from 'react';
import { Box, Flex, Skeleton } from '@chakra-ui/core';
import { useRoom } from '../../contexts/room';


function Queue() {
  const { room, streams } = useRoom();
  return (
    <>
      {room ?
        <Flex direction="row">
          <Box h="12vh" w="10vw" m="10px">
            <Box id="publishedVideo"></Box>
          </Box>
          {streams.map(stream => {
            return <Subscriber stream={stream} key={stream.connection.id} />
          })}
        </Flex>
        : <EmptyQueue />
}
    </>
  )
};

export default Queue;

// any changes in the subscribers causes all feeds to re-render - need to fix this
// tried to use React.memo but it still causes loading from OpenTok
// not sure if there is a way to cache this, or load components not from an array?

function streamCheck(prevStream, nextStream) {
  return prevStream.stream.id === nextStream.stream.id
    && prevStream.stream.connection.id === nextStream.stream.connection.id;
}

const Subscriber = React.memo(({ stream }) => {
  const { createStream } = useRoom();
  const videoRef = useRef();

  useEffect(() => {
    createStream(videoRef, stream)
  }, [videoRef, stream, createStream])

  return (
    <Box h="12vh" w="10vw" m="10px">
      <Box ref={videoRef} id={stream.connection.id}></Box>
    </Box>)
}, streamCheck);



function EmptyQueue() {
  return (
    <Flex direction="row">
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="12vh" width="10vh" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="12vh" width="10vh" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="12vh" width="10vh" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="12vh" width="10vh" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="12vh" width="10vh" m="10px" />
      <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="12vh" width="10vh" m="10px" />
    </Flex>
  )
}