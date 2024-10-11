import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Toast from '../Components/Toast';

const VerifyEmail = ({ baseUrl }) => {
    const nav = useNavigate()
  const { email } = useParams(); // Extract the email from the URL
  const [otp, setOtp] = useState(""); // Store OTP entered by the user
  const toast = useToast(); // Chakra's toast hook for notifications
  const [toastProps, setToastProps] = useState({
    title: '',
    description: '',
    status: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.trim() === "") {
      // Show an error toast if OTP is empty
      setToastProps({
        title: 'Invalid OTP',
        description: 'Please enter a valid OTP to verify your email.',
        status: 'error'
      });
      return;
    }

    try {
      // Send OTP verification request to the backend
      const response = await fetch(`${baseUrl}/verify/${email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otp }) // Only sending OTP for verification
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle unsuccessful response
        throw new Error(data.message || 'Failed to verify email');
      }

      // If successful, show success toast
      setToastProps({
        title: 'Verified',
        description: `Your email (${email}) has been verified successfully.`,
        status: 'success'
      });

      nav('/login')

    } catch (error) {
      // Show error toast if the verification fails
      setToastProps({
        title: 'Verification Failed',
        description: error.message,
        status: 'error'
      });
    }
  };

  return (
    <Flex alignItems={'center'} justifyContent={'center'} h={'70vh'}>
      <Box bgColor={'#41b3a2'} margin={'10px'} w="20em" p="10px" borderRadius={'20px'}>
        <FormControl>
          <FormLabel mt={'10px'}>Enter your OTP:</FormLabel>
          <Text color={'white'} fontSize={'13px'}>The OTP is valid for only 15 minutes!</Text>
          <Input 
            type='number' 
            mt={'10px'} 
            value={otp} 
            onChange={(e) => setOtp(e.target.value)} 
            placeholder="Enter OTP" 
          />
          <Button 
            bgColor='#ebd3f8' 
            _hover={{ bgColor: '#7a1cac', color: 'white' }} 
            w={'100%'} 
            mt={'10px'} 
            onClick={handleSubmit}
          >
            Verify
          </Button>
        </FormControl>
      </Box>

      {/* Toast for notifications */}
      <Toast 
        title={toastProps.title} 
        description={toastProps.description} 
        status={toastProps.status} 
      />
    </Flex>
  );
};

export default VerifyEmail;
