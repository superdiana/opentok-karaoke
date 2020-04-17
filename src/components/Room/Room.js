import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { Redirect, useParams } from "react-router-dom";
import Playlist from '../Playlist';
import Queue from '../Queue';
import Video from '../Video';
import useAxios from '@use-hooks/axios';
import { useCreateRoomModal } from '../CreateRoom';

function Room() {
  const { id } = useParams();
  console.log(id);
  const { modal } = useCreateRoomModal((id === undefined));
  const { response, loading, error } = useAxios({
    url: `/api/room/${id}`,
    method: 'GET',
    trigger: id,
    forceDispatchEffect: () => !!id
  });
  
  return (
    <>
      {error?.response?.status === 404 ? <Redirect to="/404" /> : null}
      {loading ? null :
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
      }
    </>
    
  )

};


export default Room;
