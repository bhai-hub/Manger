import React, { useEffect, useState } from 'react';
import Card from '../Components/Card';
import { Box, Text } from '@chakra-ui/react';

const Home = ({ userData, baseUrl }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userData && userData.passwords) {
      // Looping through passwords
      for (let i = 0; i < userData.passwords.length; i++) {
        console.log(`Password ${i + 1}:`, userData.passwords[i].password);
        console.log(`Platform:`, userData.passwords[i].nameP);
      }
    }
    setLoading(false); // Set loading to false after processing
  }, [userData]);

  return (
    <Box>
      <Text fontSize={'1.5em'} fontWeight={'bold'} m={'10px'}>All Passwords</Text>
      <Box display={{base:'block', md:'flex'}} flexWrap={'wrap'}> 
      {loading ? ( // Show loading state
        <p>Loading...</p>
      ) : (
        // Display passwords
        userData?.passwords?.length > 0 ? (
          <>
            {userData.passwords.map((item) => (
              <Card key={item._id} item={item} baseUrl={baseUrl} />
            ))}
          </>
        ) : (
          <p>No passwords found.</p>
        )
      )}
      </Box>
      
    </Box>
  );
};

export default Home;
