import { AddIcon, HamburgerIcon, InfoIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Button,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react';
import AddModal from './AddModal';
import ProfileModel from './ProfileModel';


// import { useNavigate } from 'react-router-dom';

const NavItems = ({setAuthenticate, userData, baseUrl}) => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenProfile, onOpen: onOpenProfile, onClose: onCloseProfile } = useDisclosure();
  const { isOpen: isOpenAdd, onOpen: onOpenAdd, onClose: onCloseAdd } = useDisclosure();
  const btnRef = useRef()
  const logout = () => {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('userId')
      localStorage.removeItem('token');
      toast({
        title: 'Logged out',
        description: 'You have successfully logged out.',
        status: 'info',
        duration: 3000,
        isClosable: true,
      });
      setAuthenticate(false)
      window.location.href="/login"
    }
  };

  return (
    <>
    <Button ref={btnRef} onClick={onOpen}>
      <HamburgerIcon />
    </Button>
    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>

          <DrawerBody>
          <Button
          m={'10px'}
          onClick={onOpenAdd}
          bgColor={'green.300'}
          _hover={{ bgColor: 'green.500', color: 'white' }}
          w={'100%'}
          leftIcon={<AddIcon />} // Add icon for Add Credentials button
        >
          Add Credentials
        </Button>
          <Button
          m={'10px'}
          onClick={onOpenProfile}
          bgColor={'blue.300'}
          _hover={{ bgColor: 'blue.500', color: 'white' }}
          w={'100%'}
          leftIcon={<InfoIcon />} // Add icon for Profile button
        >
          Profile
        </Button>
          <Button
          onClick={logout}
          m={'10px'}
          bgColor={'red.300'}
          _hover={{ bgColor: 'red.500', color: 'white' }}
          w={'100%'}
        //   leftIcon={<LogoutIcon />} // Add icon for Logout button
        >
          Logout
        </Button>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <AddModal isOpen={isOpenAdd} onClose={onCloseAdd} baseUrl={baseUrl} userData={userData} />
      <ProfileModel isOpen={isOpenProfile} onClose={onCloseProfile} baseUrl={baseUrl} userData={userData} />
    </>
  );
};

export default NavItems;
