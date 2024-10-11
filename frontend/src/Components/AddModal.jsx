import React, { useState } from 'react';
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
    useToast,
} from '@chakra-ui/react';

const AddModal = ({ isOpen, onClose, baseUrl }) => {
    const [nameP, setNameP] = useState('');
    const [password, setPassword] = useState('');
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const toast = useToast();

    const onAdd = async (e) => {
        e.preventDefault();

        if (!nameP || !password) {
            toast({
                title: 'Empty Field',
                description: "Enter Credentials",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return; // Prevent further execution if fields are empty
        }

        try {
            const response = await fetch(`${baseUrl}/createPass/${userId}`, {
                method: 'POST', // Ensure the method is POST
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ nameP, password })
            });

            const data = await response.json(); // Await the response

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong'); // Throw error if response not ok
            }

            toast({
                title: 'Created Successfully',
                description: 'Your password is created',
                status: 'success',
                duration: 5000,
                isClosable: true
            });

            onClose(); // Close the modal after saving
            window.location.reload(); // Refresh the page
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        }
    };

    return (
        <ChakraModal isOpen={isOpen} onClose={onClose} size={{ base: 'sm', md: 'md', lg: 'lg' }}> {/* Responsive size */}
            <ModalOverlay />
            <ModalContent maxWidth={{ base: '90%', md: '500px' }} margin="0 auto"> {/* Responsive max width */}
                <ModalHeader>Add Credentials</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Platform</FormLabel>
                        <Input 
                            type='text' 
                            onChange={(e) => setNameP(e.target.value)} 
                            mb={4} // Bottom margin for spacing
                        />
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type='password' 
                            onChange={(e) => setPassword(e.target.value)} 
                            mb={4} // Bottom margin for spacing
                        />
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onAdd}>
                        Save
                    </Button>
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    );
};

export default AddModal;
