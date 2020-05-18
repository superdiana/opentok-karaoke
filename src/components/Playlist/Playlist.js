import React from 'react';
import { Flex, Image, PseudoBox, Text, Skeleton } from '@chakra-ui/core';
import { useRoom } from '../../contexts/room';

function Playlist() {
  const { setVideoUrl } = useRoom();
  const result = [{ video_url: "/songs/black_sun.mp4", title: "Black Sun"}];

  return (
    <Flex
      direction="column"
      maxH="calc(100% - 1rem)"
      alignItems="stretch"
      overflow="scroll"
      p={4}
    >
      {result ? result.map((item) => {
        return (
          <PseudoBox
            w="100%"
            display="flex"
            direction="row"
            key={item.video_url}
            onClick={() => { setVideoUrl(item.video_url) }}
            flexWrap="nowrap"
            alignItems="center"
            _hover={{ bg: "gray.600" }}
            mb="10px"
            p="3px"
          >
            <Text fontSize="xs" flex={1}>{item.title}</Text>
          </PseudoBox>

        )
      }) :
        [...Array(5)].map((_, i) => (
          <PseudoBox
            w="100%"
            key={i}
            display="flex"
            direction="row"
            flexWrap="nowrap"
            alignItems="center"
            _hover={{ bg: "gray.600" }}
            mb="10px"
            p="3px"
          >
            <Skeleton flex={1} colorStart="#EBF8FF" colorEnd="#CEEDFF" height="90px" width="124px" m="10px" />
            <PseudoBox flex={1} width="100px">
              <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="8px" m="5px" />
              <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="8px" m="5px" />
              <Skeleton colorStart="#EBF8FF" colorEnd="#CEEDFF" height="8px" m="5px" />
            </PseudoBox>
          </PseudoBox>
        ))
      }
    </Flex>
  )
};

export default Playlist;