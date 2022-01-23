import * as React from "react"
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input, IconButton,
  Link,  Spinner,
  Button,  Alert,CheckIcon,
  HStack, useToast, AlertDialog,
  Center,  CloseIcon,
  NativeBaseProvider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "native-base"
import axios from 'axios'
export default function CreateRoom ({ navigation , route}){

 const {identity} = route.params; 
const [name, setName] = React.useState('');
const [price, setPrice] = React.useState('');
const [location, setLocation] = React.useState('');
let [alert, setAlert] = React.useState(false);
let [AlertMessage, setAlertMessage] = React.useState("");
const [isLoading, setIsLoading] = React.useState(false);
 const toast = useToast()

const onChangeName = (event) => {
 setName(event)
  //console.log(email);
}

const onChangePrice = (event) => {
 setPrice(event)
  //console.log(password);
}

const onChangeLocation = (event) => {
    setLocation(event)
     //console.log(password);
   }

   const onSubmitHandler2 = ()=>{
    navigation.navigate('Rooms Available', {identity: identity});
   }

const onSubmitHandler = (event) => {
  event.preventDefault();
  setIsLoading(true);
  axios({
    method: 'post',
    url: 'https://hotelbooking1api.herokuapp.com/api/create/hotels',
    data: {
        price:price,
        HotelName:name,
        HotelLocation:location   
    },
    config: { headers: {'Content-Type': 'application/json' }}
    })
     .then(function (response){
       console.log(response.data);
      if(typeof response.data.error !== "undefined"){
        setIsLoading(false);
        setAlert(true);
        setAlertMessage("It seems like your room details do not match the criteria for adding a room! Try again later");
      }else{
        setIsLoading(false);
        navigation.navigate('Done');
        console.log(response.data);
      
      }
   
     }).catch((err)=>console.log(err));
 
}


let AlertRender;
if (alert){
  AlertRender = <Alert w="100%" status="info" colorScheme="info">
  <VStack space={2} flexShrink={1} w="100%">
    <HStack
      flexShrink={1}
      space={2}
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack flexShrink={1} space={2} alignItems="center">
        <Alert.Icon />
        <Text fontSize="md" fontWeight="medium" color="coolGray.800">
          Kindly double check your Room details!
        </Text>
      </HStack>
      <IconButton
        variant="unstyled"
        icon={<CloseIcon size="3" color="coolGray.600" />}
      />
    </HStack>
    <Box
      pl="6"
      _text={{
        color: "coolGray.600",
      }}
    >
     {AlertMessage}
    </Box>
  </VStack>
</Alert>
}else{
  AlertRender = "";
}


  return (
    <NativeBaseProvider>
     <Center flex={1} px="3">
    <Box safeArea p="2" py="8" w="90%" maxW="290">
      <Heading
        size="lg"
        fontWeight="600"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      >
        Create a new Room!
      </Heading>
      <Heading
        mt="1"
        _dark={{
          color: "warmGray.200",
        }}
        color="coolGray.600"
        fontWeight="medium"
        size="xs"
      >
        Kindly provide room details!
      </Heading>

      {AlertRender}

      {isLoading ? <HStack space={2} alignItems="center">
      <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
      <Heading color="primary.500" fontSize="2xl">
        Be patient as we work on registration of the room..
      </Heading>
    </HStack> : 

      <VStack space={3} mt="5">
        <FormControl>
          <FormControl.Label>Room Price</FormControl.Label>
           <Input name="price" value={price} onChangeText={onChangePrice} />
  
        </FormControl>
        <FormControl>
          <FormControl.Label>Hotel Location</FormControl.Label>
          <Input name="location" value={location} onChangeText={onChangeLocation} />
        </FormControl>
        <FormControl>
          <FormControl.Label>Hotel Name</FormControl.Label>
          <Input  name="name" value={name} onChangeText={onChangeName}/>
          <Link
            _text={{
              fontSize: "xs",
              fontWeight: "500",
              color: "indigo.500",
            }}
            alignSelf="flex-end"
            mt="1"
          >
            check out our hotel rooms policy
          </Link>
        </FormControl>
        <Button type="submit"mt="2" colorScheme="indigo"
        onPress={onSubmitHandler}>
          Add a New Room
        </Button>
        <Button mt="2" colorScheme="blue"
        onPress={onSubmitHandler2}>
          View All Rooms
        </Button>
      </VStack>}
    </Box>
    </Center>
    </NativeBaseProvider>
  )
}