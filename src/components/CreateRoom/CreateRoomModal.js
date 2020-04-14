import React, { useEffect, useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useHistory } from "react-router-dom";
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
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/core";

function CreateRoomModal({ visible, toggle }) {
  const focus = useRef();
  const history = useHistory();

  const createNewRoom = (values, actions) => {
    // send to API, on valid response redirect to new room
    console.log(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
    history.push(`/${values.playlistId}`)
    toggle();
  }

  return (
    <Modal
      isOpen={visible}
      onClose={toggle}
      isCentered={true}
      initialFocusRef={focus}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Karaoke Room</ModalHeader>
        <ModalCloseButton />
        <Formik
          initialValues={{ playlistId: "", roomName: "" }}
          onSubmit={createNewRoom}
        >
          {({ isSubmitting, handleSubmit}) => (
            <form onSubmit={handleSubmit}>
              <ModalBody>
                <Field name="playlistId">
                  {({ field }) => (
                    <FormControl mb={10}>
                      <FormLabel htmlFor="playlistId">YouTube Playlist</FormLabel>
                      <Input {...field} id="playlistId" placeholder="123-456-789" ref={focus} />
                    </FormControl>
                  )}
                </Field>


                <Field name="roomName">
                  {({ field }) => (
                    <FormControl mb={10}>
                      <FormLabel htmlFor="roomName">Room Name</FormLabel>
                      <Input {...field} id="roomName" placeholder="My Room Name" />
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

function useCreateRoomModal(visible = false) {
  const { isOpen, onOpen, onToggle } = useDisclosure();
  useEffect(() => {
    if (visible) onOpen();
  }, [visible, onOpen])

  const modal = <CreateRoomModal visible={isOpen} toggle={onToggle} />;

  return {
    modal,
    toggle: onToggle
  }
}

export {
  useCreateRoomModal,
  CreateRoomModal
};