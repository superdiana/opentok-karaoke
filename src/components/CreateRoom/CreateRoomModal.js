import React, { useRef } from 'react';
import { Formik, Field } from 'formik';
import { useHistory } from "react-router-dom";
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { useRoom } from '../../contexts/room';
// import Toaster from '../Toaster';
import { useAuth } from '../../contexts/firebase';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton
} from "@chakra-ui/core";

function CreateRoomModal() {
  const history = useHistory();
  const { user } = useAuth();
  const { modalVisible: visible, closeModal: close } = useRoom();
  const focus = useRef();
  
  const createNewRoom = (values, actions) => {
    let data = {
      ...values,
      owner: user.email
    }
    actions.setSubmitting(false);
    axios({
      method: 'post',
      url: '/api/room',
      data: data
    })
      .then((res) => {
        actions.setSubmitting(false);
        close();
        if (!!res.data?.id) history.push(`/${res.data.id}`)
      })
      .catch((err) => {
        console.log(err);
        actions.setSubmitting(false);
      })
  }

  return (
    <Modal
      isOpen={visible}
      onClose={close}
      isCentered={true}
      initialFocusRef={focus}
    >
      <Helmet>
        <title>Create New Room - OTK</title>
      </Helmet>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Karaoke Room</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ playlist_id: "", room_name: `${user.displayName}'s Room` }}
          onSubmit={createNewRoom}
        >
          {({ isSubmitting, handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Field name="playlist_id">
                  {({ field }) => (
                    <FormControl mb={10}>
                      <FormLabel htmlFor="playlist_id">YouTube Playlist ID</FormLabel>
                      <Input {...field} id="playlist_id" placeholder="123-456-789" ref={focus} />
                    </FormControl>
                  )}
                </Field>


                <Field name="room_name">
                  {({ field }) => (
                    <FormControl mb={10}>
                      <FormLabel htmlFor="room_name">Room Name</FormLabel>
                      <Input {...field} id="room_name" />
                    </FormControl>
                  )}
                </Field>

              </ModalBody>
              <ModalFooter>
                <Button
                  variantColor="blue"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                  type="submit"
                >
                  Create Room
                </Button>
              </ModalFooter>
            </form>
          )}
        </Formik>
      </ModalContent>
    </Modal>
  )
};


export default CreateRoomModal;
