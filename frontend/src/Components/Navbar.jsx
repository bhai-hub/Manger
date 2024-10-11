import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import NavItems from './NavItems'

const Navbar = ({isAuthenticated, setAuthenticate, userData, baseUrl}) => {
  return (
    <>
      <Box display='flex' bg='#41b3a2' alignItems={'center'} justifyContent={'space-between'} padding={'10px'}>
        <Box margin={'10px'}>
            <Text fontSize={'25px'} fontWeight={'bold'} color={"#ffffff"}>PassBay</Text>
        </Box>
        <Box display={{base:'block', md:'none'}}>
        {isAuthenticated && <NavItems setAuthenticate={setAuthenticate} userData={userData} baseUrl={baseUrl}/>}
        </Box>
      </Box>
    </>
  )
}

export default Navbar
