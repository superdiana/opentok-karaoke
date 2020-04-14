import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { useHistory, useParams } from "react-router-dom";
import Playlist from '../Playlist';
import Queue from '../Queue';
import Video from '../Video';
import { useCreateRoomModal } from '../CreateRoom';

const sampleRooms = ['12345', '67890']

function Room() {
  const { id } = useParams();
  const history = useHistory();
  const { modal } = useCreateRoomModal((id === undefined));

  useEffect(() => {
    //if invalid ID, redirect to 404
    if (sampleRooms.indexOf(id) === -1) history.push("/404");
    // valid ID - set up OpenTok pub/sub

  }, [id, history]);

  return (
    <>
      {modal}
      <Flex direction="row" w="100vw" color="white" flex="1 1 70vh" overflow="hidden">
        <Box flexBasis="80vw" color="white" p={4}>
          <Video />
        </Box>
        <Box color="white" maxH="100%" flex="1">
          <Playlist />
        </Box>
      </Flex>
      <Box maxW="100vw" maxH="30vh" p={4} color="white">
        <Queue />
      </Box>
    </>
  )
};


export default Room;
