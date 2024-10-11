import { Box, Button, useDisclosure, useToast} from '@chakra-ui/react';
import React from 'react';
import AddModal from './AddModal';
import ProfileModel from './ProfileModel'; // Corrected component name
import { AddIcon, InfoIcon} from '@chakra-ui/icons'; // Importing icons

const Sidebar = ({ setAuthentication, baseUrl, userData }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const toast = useToast();

  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('userId');
      localStorage.removeItem('token');
      toast({
        title: 'Logged out',
        description: 'You have successfully logged out.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setAuthentication(false);
      window.location.href = "/login"; // Consider using React Router for navigation
    }
  };

  return (
    <>
      <Box display={{base:'none',md:'flex' }} flexDirection={{ base: 'row', md: 'column' }} justifyContent={{ base: 'space-between', md: 'flex-start' }}>
        <Button
          m={'10px'}
          onClick={onOpen}
          bgColor={'green.300'}
          _hover={{ bgColor: 'green.500', color: 'white' }}
          leftIcon={<AddIcon />} // Add icon for Add Credentials button
        >
          Add Credentials
        </Button>
        <Button
          m={'10px'}
          onClick={onOpenProfile}
          bgColor={'blue.300'}
          _hover={{ bgColor: 'blue.500', color: 'white' }}
          leftIcon={<InfoIcon />} // Add icon for Profile button
        >
          Profile
        </Button>
        <Button
          onClick={logout}
          m={'10px'}
          bgColor={'red.300'}
          _hover={{ bgColor: 'red.500', color: 'white' }}
        //   leftIcon={<LogoutIcon />} // Add icon for Logout button
        >
          Logout
        </Button>
      </Box>
      <AddModal isOpen={isOpen} onClose={onClose} baseUrl={baseUrl} userData={userData} />
      <ProfileModel isOpen={isOpenProfile} onClose={onCloseProfile} baseUrl={baseUrl} userData={userData} />
    </>
  );
}

export default Sidebar;
