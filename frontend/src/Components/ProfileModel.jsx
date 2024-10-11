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
    Text,
    FormLabel,
    useToast,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const ProfileModal = ({ isOpen, onClose, baseUrl }) => {
    const [userData, setUserData] = useState(null); // Initialize with null
    const toast = useToast();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId');

            try {
                const response = await fetch(`${baseUrl}/getuser/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                toast({
                    title: 'Error fetching user data',
                    description: error.message,
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
            }
        };

        fetchUserData();
    }, [baseUrl, toast]); // Added dependencies for better hooks practice

    const forgotPassword = async () => {
        if (!userData?.email) { // Optional chaining to avoid errors
            toast({
                title: 'Error',
                description: 'Invalid request',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/reqPass/${userData.email}`, {
                method: 'POST',
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error sending reset link');
            }

            toast({
                title: 'Success',
                description: 'Reset link sent to email, please check',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: error.message || 'An unexpected error occurred.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <ChakraModal isOpen={isOpen} onClose={onClose} size={{ base: 'sm', md: 'md', lg: 'lg' }}> {/* Responsive size */}
            <ModalOverlay />
            <ModalContent maxWidth={{ base: '90%', md: '500px' }} margin="0 auto"> {/* Responsive max width */}
                <ModalHeader>Profile Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Email:</FormLabel>
                        <Text>{userData?.email || 'Loading...'}</Text>
                        <FormLabel mt={4}>Name:</FormLabel>
                        <Text>{userData?.name || 'Loading...'}</Text>
                        <Text
                            color='blue.500'
                            cursor='pointer'
                            onClick={forgotPassword}
                            mt={2}
                        >
                            Forgot Password?
                        </Text>
                    </FormControl>
                </ModalBody>

                <ModalFooter>
                    <Button variant="ghost" onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    );
}

export default ProfileModal;
