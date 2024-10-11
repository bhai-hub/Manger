import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ baseUrl }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility
  const [isLoading, setIsLoading] = useState(false); // Loading state during form submission
  const toast = useToast(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: 'Missing Credentials',
        description: 'Please enter both email and password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true); // Start loading

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.message || 'Login failed';
        throw new Error(errorMsg);
      }

      
      localStorage.setItem('userId',data.user.id);
      localStorage.setItem('token', data.token);
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setEmail('');  // Reset email field
      setPassword('');  // Reset password field
      window.location.href="/";  // Navigate to dashboard or home
    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false); // Stop loading after the request is completed
    }
  };

  return (
    <Flex alignItems={'center'} justifyContent={'center'} h={'70vh'}>
      <Box bgColor={'#41b3a2'} margin={'10px'} w="20em" p="10px" borderRadius={'20px'}>
        <FormControl>
          <FormLabel mt={'10px'}>Email:</FormLabel>
          <Input 
            type='email' 
            onChange={(e) => setEmail(e.target.value)} 
            value={email}
            isDisabled={isLoading} // Disable input when loading
          />
          
          <FormLabel mt={'10px'}>Password:</FormLabel>
          <InputGroup>
            <Input 
              type={showPassword ? 'text' : 'password'} 
              bgColor={'white'} 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
              isDisabled={isLoading} // Disable input when loading
            />
            <InputRightElement>
              <Button
                size="sm"
                onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                isDisabled={isLoading}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button 
            bgColor='#ebd3f8' 
            _hover={{ bgColor: '#7a1cac', color: 'white' }} 
            w={'100%'} 
            mt={'10px'} 
            onClick={handleSubmit}
            isLoading={isLoading} // Show loading spinner on the button
            loadingText="Logging in..."
          >
            {isLoading ? <Spinner /> : 'Login'}
          </Button>
        </FormControl>
        
        <Box fontStyle={'italic'} fontSize={'0.75em'} textAlign={'center'} mt={'10px'} color={'white'}>
          <Text>Don't Have an Account? 
            <Text as={Link} to='/signup' _hover={{ color: "#7a1cac" }}> Create Account</Text>
          </Text>
          <Text as={Link} textAlign={'center'} to={'/forgot'} _hover={{ color: "#7a1cac" }}>Forgot Password?</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default Login;
