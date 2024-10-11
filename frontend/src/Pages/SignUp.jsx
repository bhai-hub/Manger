import { Box, Button, Flex, FormControl, FormLabel, Input, Text, useToast } from '@chakra-ui/react'
import React, { useState} from 'react'
import { Link, useNavigate  } from 'react-router-dom'

const SignUp = ({baseUrl}) => {
  const navigate = useNavigate()
  const toast = useToast()
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [conPass, setConPass] = useState('')
  const [name, setName] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(!email || !pass || !conPass ||!name){
      toast({
        title:'Missing creadentials',
        description:'All fields are required',
        status:'error',
        duration:'5000',
        isClosable:true
      })
    }

    if(pass !== conPass){
      toast({
        title:'Password does not match',
        status:'error',
        duration:'5000',
        isClosable:true
      })
    }

    try {
      const response = await fetch(`${baseUrl}/register`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({
          name, 
          email,
          password:pass,
          confirmPassword:conPass
        })
      })

      const data = await response.json()
      if(!response.ok){
        throw new Error(data.message || 'Login failed');
      }

      toast({
        title: 'Created account successfully',
        description: 'Verify your email',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate(`/verify/${email}`)


    } catch (error) {
      toast({
        title: 'Login Failed',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }
  return (
    <Flex alignItems={'center'} justifyContent={'center'} h={'70vh'} m={'20px'}>
      <Box bgColor={'#41b3a2'} margin={'10px'} w="25em" p="10px" borderRadius={'20px'} mt={'10px'}> 
        <Text textAlign={'center'} fontSize={'1.5em'} fontWeight={'bold'} color={'white'}>Sign Up</Text>
        <FormControl>
          <FormLabel mt={'10px'}>Name:</FormLabel>
          <Input type='text' bgColor={'white'} onChange={(e)=>setName(e.target.value)}/>
          <FormLabel mt={'10px'} >Email:</FormLabel>
          <Input type='email' bgColor={'white'} onChange={(e)=>setEmail(e.target.value)}/>
          <FormLabel mt={'10px'} >Password:</FormLabel>
          <Input type='password' bgColor={'white'} onChange={(e)=>setPass(e.target.value)}/>
          <FormLabel mt={'10px'} >Confirm Password:</FormLabel>
          <Input type='password' bgColor={'white'} onChange={(e)=>setConPass(e.target.value)}/>
          <Button bgColor='#ebd3f8' _hover={{bgColor:'#7a1cac',color:'white'}} w={'100%'}mt={'10px'} onClick={handleSubmit}>Sign Up</Button>
        </FormControl>
        <Box  fontStyle={'italic'} fontSize={'0.75em  '} textAlign={'center'} mt={'10px'} color={'white'}>
        <Text>Already Have Account?<Text as={Link} to='/login' _hover={{color:"#7a1cac"}}> Login</Text></Text>
        {/* <Text as={Link} textAlign={'center'} _hover={{color:"#7a1cac"}}>Forgot Password</Text> */}
        </Box>
        
      </Box>
    </Flex>
  )
}

export default SignUp
