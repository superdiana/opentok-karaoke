import React from 'react';
import { useToast } from '@chakra-ui/core';

function Toaster({type, title, description}) {
  const toast = useToast();
  let toasted = toast({
    title: title,
    description: description,
    status: type,
    duration: 7000,
    isClosable: true,
  })
  return (
    <>
      {toasted}
    </>
  )
}

export default Toaster;