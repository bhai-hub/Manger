import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Forgot = ({ baseUrl }) => {
  const { userId, token, forId } = useParams();
  const toast = useToast();

  const [newPass, setNewPass] = useState('');
  const [conPass, setConPass] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate empty fields
    if (!newPass || !conPass) {
      toast({
        title: 'All fields are required',
        description: 'Please fill in both fields.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Check if passwords match
    if (newPass !== conPass) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure both passwords match.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      // API call
      const response = await fetch(`${baseUrl}/forgotPass/${userId}/${token}/${forId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPass }),
      });

      const data = await response.json();  // Await the response to get data

      // Handle unsuccessful response
      if (!response.ok) {
        const errorMsg = data.message || 'Error with response. Please try again later.';
        throw new Error(errorMsg);
      }

      // Success message
      toast({
        title: 'Password changed successfully',
        description: 'You can now log in with your new password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      window.location.href = '/login';  // Redirect to login

    } catch (error) {
      // Error handling
      toast({
        title: 'An error occurred',
        description: error.message,  // Show actual error message
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex alignItems={'center'} justifyContent={'center'} h={'70vh'} m={'20px'}>
      <Box bgColor={'#41b3a2'} margin={'10px'} w="25em" p="10px" borderRadius={'20px'} mt={'10px'}>
        <Text textAlign={'center'} fontSize={'1.5em'} fontWeight={'bold'} color={'white'}>Reset Password</Text>
        <FormControl>
          <FormLabel mt={'10px'}>New password:</FormLabel>
          <Input type='password' bgColor={'white'} value={newPass} onChange={(e) => setNewPass(e.target.value)} />
          <FormLabel mt={'10px'}>Confirm password:</FormLabel>
          <Input type='password' bgColor={'white'} value={conPass} onChange={(e) => setConPass(e.target.value)} />
          <Button bgColor='#ebd3f8' _hover={{ bgColor: '#7a1cac', color: 'white' }} w={'100%'} mt={'10px'} onClick={onSubmit}>Change password</Button>
        </FormControl>
      </Box>
    </Flex>
  );
};

export default Forgot;
