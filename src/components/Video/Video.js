import React, { useEffect, useRef, useState} from 'react';
import { Flex, Skeleton } from '@chakra-ui/core';
import { Player, BigPlayButton } from 'video-react';
import { useRoom } from '../../contexts/room';

function Video() {
  const { videoUrl, createVideoPublisher, captureStarted, setCaptureStarted, } = useRoom();
  const videoRef = useRef();

  useEffect(() => {
    if (!videoRef.current && !captureStarted) return;
    console.log("Creating song publisher");
    const video = document.querySelector('.video-react-video');
    console.log(video);
    createVideoPublisher(video)
    setCaptureStarted(true)
  });

  // useEffect(() => {
  //   if (!videoRef.current) return;
  //   const handleStateChange = (state, prevState) => {
  //     // console.log(!captureStarted);
  //     if (!captureStarted) {
  //       
  //       // createVideoPublisher(video)
  //       // setCaptureStarted(true)
  //       return;
  //     }
  //   }

  //   videoRef.current.subscribeToStateChange(handleStateChange);
  // }, [videoRef, captureStarted, setCaptureStarted, createVideoPublisher])


  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
    >
      {videoUrl ? 
        <Player fluid ref={videoRef}>
          <source src={videoUrl} />
          <BigPlayButton position="center" />
        </Player> : <Skeleton
          colorStart="#EBF8FF"
          colorEnd="#CEEDFF"
          h="80%"
          w="80%"
          m="10px"
        />
    }
    </Flex>
  )
};

export default Video;



//       }