import React from 'react';
import { Button, Flex, Heading } from '@chakra-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../../contexts/firebase';
import Toaster from '../Toaster';

function Login({ error = false }) {
  const { googleLogin } = useAuth();

  return (
    <Flex
      h="100vh"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      backgroundImage="url('/images/login-background.jpg')"
      backgroundSize="cover"
    >
      {error ?
        <Toaster
          type="error"
          title="Login Failed"
          description="Something went wrong."
        /> :
        null
      }
      <Flex
        bg="white"
        direction="column"
        alignItems="center"
        justifyContent="space-around"
        borderRadius="10px"
        boxShadow="8px 8px 4px 4px #1A365D"
        p={6}
        h="20vh"
        w="30vw"
      >
        <Heading>OpenTok Karaoke</Heading>
        <Button
          variantColor="blue"
          w="60%"
          variant="solid"
          display="flex"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          onClick={googleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} />
          Login With Google
        </Button>
      </Flex>
    </Flex>
  )
}

// Photo by BRUNO CERVERA on Unsplash
export default Login;