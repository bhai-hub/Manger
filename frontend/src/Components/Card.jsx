import { Box, Button, Text, useDisclosure, useToast } from '@chakra-ui/react';
import React from 'react';
import CustomModal from './Modal';

const Card = ({ item, baseUrl, userData, onDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const userId = localStorage.getItem('userId')
  const deletePassword = async () => {
    const token = localStorage.getItem('token');

    if (window.confirm("Are you sure you want to delete this password?")) {
      try {
        const response = await fetch(`${baseUrl}/deletePass/${item._id}/${userId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to delete the password');
        }

        toast({
          title: "Deleted Successfully",
          description: "Your password has been deleted.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });

        window.location.reload()

        // Call the onDelete function passed from the parent component
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  return (
    <Box bgColor={'white'} w={'20em'} p={'10px'} borderRadius={'10px'} m={'10px'}>
      <Box>
        <Text>
          Platform: <span>{item.nameP}</span>
        </Text>
        <Text>
          Password: <span>{item.password}</span>
        </Text>
      </Box>
      <Box w={'100%'} textAlign={'right'}>
        <Button color={'lightcoral'} m={'5px'} onClick={deletePassword}>
          Delete
        </Button>
        <Button m={'5px'} onClick={onOpen}>
          Edit
        </Button>
      </Box>
      <CustomModal isOpen={isOpen} onClose={onClose} item={item} baseUrl={baseUrl} />
    </Box>
  );
};

export default Card;
