import React from 'react';
import { Box, Flex } from '@chakra-ui/core';
import { Redirect } from "react-router-dom";
import { Helmet } from 'react-helmet';

import Playlist from '../Playlist';
import Queue from '../Queue';
import Video from '../Video';
import { useRoom } from '../../contexts/room';

function Room() {
  const { room } = useRoom();
  const { result, error, loading } = room;

  return (
    <>
      {error?.response?.status === 404 ? <Redirect to="/404" /> : null}
      {loading ? null :
        <>
          <Helmet>
            <title>{`${result?.data.data[0].room_name} - OTK`}</title>
          </Helmet>
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

