import React from 'react'
import { View } from 'react-native'


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
  } from "native-base"
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import { NavigationContainer } from '@react-navigation/native';
export default function BookRoom({ route, navigation }) {
    const { name, location, id,HotelLocation,HotelName, created ,price, email} = route.params;
    const [isLoading, setIsLoading] = React.useState(false);

const bookRoom = (e)=>{
e.preventDefault();
setIsLoading(true);
axios({
    method: 'post',
    url: 'https://hotelbooking1api.herokuapp.com/api/hotel/book',
    data: {
      "email":email,
      "RoomNo":id,
      "pricePaid":price,
      "HotelLocation":HotelLocation,
      "HotelName":HotelName
      
  },
    config: { headers: {'Content-Type': 'application/json' }}
    })
.then((res)=>{
    setIsLoading(false);
    navigation.navigate('Booked');
    //console.log(res.data);
})
.catch( (err)=> console.log(err))
}


    if (isLoading) {
        return (
            <Center flex={1} mx={4}>
            <HStack space={2} alignItems="center">
      <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
      <Heading color="primary.500" fontSize="xl">
        Please wait while we help you book the room..
      </Heading>
    </HStack> </Center>
        );
    }else{
    return (
        <Center flex={1} mx={4}>
            <Alert w="100%" status="success">
                <VStack space={1} flexShrink={1} w="100%" alignItems="center">
                <MaterialIcons name="hotel" size={75} color="green" />
                    <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Room Details!
                    </Text>

                    <Box
                        _text={{
                            textAlign: "center",
                        }}
                        _dark={{
                            _text: {
                                color: "coolGray.600",
                            },
                        }}
                    >
                          <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Hotel Name:
                    </Text>
                        {name}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Hotel Location:
                    </Text>
                        {location}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        # Room Identification No:
                    </Text>
                        {id}

                        <Text
                        fontSize="lg"
                        fontWeight="bold"
                        _dark={{
                            color: "coolGray.800",
                        }}
                    >
                        Made Available On:
                    </Text>
                        {created}

                        <Button variant="outline" colorScheme="success"
          onPress={bookRoom}>
            Book This Room
        </Button>

                    </Box>
                    <Button variant="outline" colorScheme="info"
          onPress={() => navigation.navigate('Booked Room List', {identity: email})}>
            View Booked Rooms
        </Button>
                </VStack>
            </Alert></Center>
    )}
}