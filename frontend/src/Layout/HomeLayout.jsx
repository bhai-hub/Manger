import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Home from '../Pages/Home';
import Sidebar from '../Components/Sidebar';

const HomeLayout = ({ setAuthentication, baseUrl, setUserdata }) => {
    const [userData, setUserData] = useState();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        async function fetchData(userId, token) {
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
                setUserdata(data.user)
                setUserData(data.user);

            } catch (error) {
                alert('Error fetching user data: ' + error.message);
            }
        }

        fetchData(userId, token);
    }, [baseUrl]);

    return (
        <Flex
            direction={{ base: 'column-reverse', md: 'row' }} // Stack in column on small screens, row on medium and larger screens
            minHeight="100vh" // Ensure the layout takes the full height
        >
            <Box
                width={{ base: '100%', md: '20em' }} // Full width on small screens, fixed width on larger screens
                padding={{ base: '1em', md: '2em' }} // Adjust padding based on screen size
                mb={{ base: '10px', md: '0' }} // Margin bottom on small screens for spacing
                position={'sticky'} // Make sidebar sticky on medium and larger screens
                top={100} // Align sticky sidebar to the top
                zIndex={1} // Ensure it appears above the main content
            >
                {/* Sidebar */}
                <Sidebar setAuthentication={setAuthentication} baseUrl={baseUrl} userData={userData} />
            </Box>
            <Box
                position="relative" // Set position relative for overlay positioning
                m={{ base: '0', md: '10px' }} // Margin adjustment for the main content
                flex="1" // Allow this box to grow and take available space
                padding={{ base: '1em', md: '0' }} // Padding adjustments based on screen size
            >
                <Home userData={userData} baseUrl={baseUrl} />
                {/* Overlay Box */}
            </Box>
        </Flex>
    );
};

export default HomeLayout;
