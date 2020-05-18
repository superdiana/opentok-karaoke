import React, { useEffect, useState } from 'react';
import { useRouteMatch } from "react-router-dom";
import { useAsync } from 'react-async-hook';
import { useDisclosure } from '@chakra-ui/core';
import OT from '@opentok/client';
import axios from 'axios';

const RoomContext = React.createContext();

// const createRoom = async id => {
//   if (!id) return null;
//   return await axios.get(`/api/room/${id}`)
// };

const getRoom = async id => {
  if (!id) return null;
  return await axios.get(`/api/room/${id}`)
};

const getOTToken = async id => {
  if (!id) return null;
  return await axios.get(`/api/room/${id}/token`)
};

// const getYTPlaylistItems = async id => {
//   if (!id) return null;
//   return await axios.get(`/api/room/${id}/playlist`)
// };

function RoomProvider({ children }) {
  const home = useRouteMatch("/");
  const route = useRouteMatch("/:id");
  const room = useAsync(getRoom, [route?.params?.id]);
  const token = useAsync(getOTToken, [route?.params?.id]);
  // const playlist = useAsync(getYTPlaylistItems, [route?.params?.id]);

  const [publisher, setPublisher] = useState(null);
  const [session, setSession] = useState(null);
  const [streams, setStreams] = useState([]);
  const [connected, setConnected] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [captureStarted, setCaptureStarted] = useState(false);
  const { isOpen: modalVisible, onOpen: openModal, onClose: closeModal } = useDisclosure();

  //show/hide create room modal
  useEffect(() => {
    if (home.isExact) openModal();
  }, [home.isExact, openModal])

  // create session and publisher when room is loaded
  useEffect(() => {
    if (!room.result) return;
    console.log("Creating Session and Publisher");
    setSession(OT.initSession(process.env.REACT_APP_OPENTOK_API_KEY, room.result.data.data[0].session));
    setPublisher(OT.initPublisher("publishedVideo", { height: "100%", width: "100%" }));
  }, [room.result]);

  // set session event handlers and connect to session
  useEffect(() => {
    if (!session || !token.result) return;
    console.log("Setting Events");

    session.on("streamCreated", event => {
      console.log("streamCreated event")
      setStreams(currentStreams => [...currentStreams, event.stream]);
    });

    session.on("streamDestroyed", function (event) {
      console.log(`Stream ${event.stream.id} ended - ${event.reason}`);
      setStreams(currentStreams => {
        let p = currentStreams.indexOf(event.stream);
        if (p > -1) currentStreams.splice(p, 1);

        return [...currentStreams];
      });
    });

    session.connect(token.result.data.token, (err) => {
      if (err) return;
      console.log("Session Connected");
      setConnected(true)
    })
  }, [session, token.result]);

  // publish stream to session
  useEffect(() => {
    if (!connected) return;
    console.log("Publishing Stream");
    session.publish(publisher);
  }, [connected, session, publisher]);

  // method to create new streams
  const createStream = (ref, stream) => {
    console.log("Creating Stream Subscription");
    session.subscribe(stream, ref?.current?.id, {
      width: '100%',
      height: '100%'
    });
  };

  const createVideoPublisher = (video) => {
    let songPublisher;
    const stream = video.captureStream();
    const publish = () => {
      const videoTracks = stream.getVideoTracks();
      const audioTracks = stream.getAudioTracks();
      if (!songPublisher && videoTracks.length > 0 && audioTracks.length > 0) {
        stream.removeEventListener('addtrack', publish);
        songPublisher = OT.initPublisher('publisher', {
          videoSource: videoTracks[0],
          audioSource: audioTracks[0],
          name: "songPublisher"
        }, (err) => {
          if (err) {
            video.pause();
            alert(err.message);
          } else {
            session.publish(songPublisher);
          }
        });
        songPublisher.on('destroyed', () => {
          video.pause();
        });
      }
    };
    stream.addEventListener('addtrack', publish);
    publish();
  };

  const value = {
    room,
    streams,
    createStream,
    session,
    videoUrl,
    setVideoUrl,
    createVideoPublisher,
    captureStarted,
    setCaptureStarted,
    modalVisible,
    openModal,
    closeModal
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  )
};

function useRoom() {
  const context = React.useContext(RoomContext);

  if (context === undefined) {
    throw new Error('useRoom must be used within RoomProvider')
  }

  return context;
}

export default RoomProvider;
export { useRoom };


// const createNewRoom = (values, actions) => {
//   let data = {
//     ...values,
//     owner: user.email
//   }
//   actions.setSubmitting(false);
//   axios({
//     method: 'post',
//     url: '/api/room',
//     data: data
//   })
//     .then((res) => {
//       actions.setSubmitting(false);
//       toggle();
//       if (!!res.data?.id) history.push(`/${res.data.id}`)
//     })
//     .catch((err) => {
//       console.log(err);
//       actions.setSubmitting(false);
//     })
// }
// function handleError(error) {
//   if (error) {
//     alert(error.message);
//   }
// }