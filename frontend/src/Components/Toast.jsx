import React, { useEffect } from 'react';
import { useToast } from '@chakra-ui/react';

const Toast = ({ title, description, status }) => {
  const toast = useToast();

  useEffect(() => {
    if (title) {
      toast({
        title: title,
        description: description,
        status: status || 'info', // Default to 'info' status if not provided
        duration: 5000, // Toast duration in milliseconds
        isClosable: true,
        position: 'top-right', // You can change the position as needed
      });
    }
  }, [title, description, status, toast]);

  return null; // No UI elements needed, just triggering the toast
};

export default Toast;
