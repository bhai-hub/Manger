import { Box, Button, Flex, FormControl, Input, Text, useToast} from '@chakra-ui/react';
import React, { useState } from 'react';
const ForgotPass2 = ({baseUrl}) => {

    const [email, setEmail] = useState('')
    const toast = useToast()

    const onHandle = async(e)=>{
        e.preventDefault()

        if(!email){
            toast({
                title:'Invalid',
                description:'Enter your email',
                status:'error',
                duration:5000,
                isClosable:true
            })
        }

        try {
            const response = await fetch(`${baseUrl}/reqPass/${email}`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                }
            })

            const data = response.json()

            if(!response.ok){
                const errorMsg = data.message || "error"

                throw new Error(errorMsg)
            }

            toast({
                title:'Done',
                description:'Check your email',
                status:'success',
                duration:5000,
                isClosable:true
            })


        } catch (error) {
            toast({
                title:'Error',
                description:'Server Error',
                status:'error',
                duration:5000,
                isClosable:true
            })
        }
    }
  return (
    <Flex alignItems={'center'} justifyContent={'center'} h={'70vh'} m={'20px'}>
    <Box bgColor={'#41b3a2'} margin={'10px'} w="25em" p="10px" borderRadius={'20px'} mt={'10px'}> 
    <Box fontSize={'2em  '} mt={'10px'} color={'white'} fontWeight={'bold'}>
      <Text>Enter your email</Text>
      </Box>
      <FormControl>
        <Input type='email' bgColor={'white'} onChange={(e)=>setEmail(e.target.value)}/>
        <Button bgColor='#ebd3f8' _hover={{bgColor:'#7a1cac',color:'white'}} w={'100%'}mt={'10px'} onClick={onHandle}>Next</Button>
      </FormControl>
    </Box>
  </Flex>
  )
}

export default ForgotPass2
