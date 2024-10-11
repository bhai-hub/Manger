import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    Input,
    FormLabel,
  } from '@chakra-ui/react';
  
  import React, { useState } from 'react';
  
  const CustomModal = ({ isOpen, onClose, item, baseUrl }) => {
    const [nameP, setNameP] = useState(item.nameP);
    const [password, setPassword] = useState(item.password);
    const token = localStorage.getItem('token');
  
    const handleSave = async (e) => {
      e.preventDefault();
      // Input validation
      if (!nameP || !password) {
        alert('Both fields are required!');
        return;
      }
  
      try {
        const response = await fetch(`${baseUrl}/updatePass/${item._id}/${item.userId}`, {
          method: 'POST', // Use PUT or PATCH based on your API design
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ nameP, password }), // Send the updated data
        });
  
        if (!response.ok) {
          throw new Error('Failed to update the password');
        }
  
        const data = await response.json();
        console.log('Password updated successfully:', data);
        // Optionally, you can call onSave or any other callback here if needed
      } catch (error) {
        console.error('Error updating password:', error);
        alert(error.message); // Show error to the user
      }


      onClose(); // Close the modal after saving
      window.location.reload(true)
    };
  
    return (
      <ChakraModal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Credentials</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Platform</FormLabel>
              <Input type='text' value={nameP} onChange={(e) => setNameP(e.target.value)} />
              <FormLabel mt={4}>Password</FormLabel>
              <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
          </ModalBody>
  
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </ChakraModal>
    );
  };
  
  export default CustomModal;
  