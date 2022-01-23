
import React, { useState, useEffect } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { Fontisto } from '@expo/vector-icons';
import {
    NativeBaseProvider,
    Box,
    Text,
    Pressable,
    Heading,
    IconButton,
    Icon,
    HStack,
    Avatar,
    VStack,
    Spacer,
    Spinner,
    Center,
} from 'native-base';
import { SwipeListView } from 'react-native-swipe-list-view';
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons';
import axios from 'axios';
let data = [];
export default function BookedRoomList({ navigation, route}) {
    const [mode, setMode] = useState('Basic');
    const {identity} = route.params;
    useEffect(() => {
        // data = [];
    });
    return (
        <NativeBaseProvider>
            <Box bg="white" flex="1" safeAreaTop>
                <Heading p="4" pb="3" size="lg">
                    These are your booked Hotel Rooms
                </Heading>
                <Basic email={identity}nav={navigation} />
            </Box>
        </NativeBaseProvider>
    );
}



function Basic({ nav , email}) {

    const [listData, setListData] = useState(data);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        data = [];
        //using a fake rest api, will replace with the voters api when done
        axios.post('https://hotelbooking1api.herokuapp.com/api/customer/booked', {email: email})
            //.then(response => response.json())
            .then(
                function (response) {
                     console.log(response.data);
                    response.data.data.forEach(element => {

                        data.push(element);
                        setIsLoading(false);
                    });
                }
            ).catch((err)=>console.log(err));


    });



    //console.log(data);

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };


    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...listData];
        const prevIndex = listData.findIndex((item) => item.key === rowKey);
        newData.splice(prevIndex, 1);
        // setTimeout(() => setIsLoading(false), 1000);
        setListData(newData);

    };

    const onRowDidOpen = (rowKey) => {
        console.log('This row opened', rowKey);
    };

    const renderItem = ({ item, index }) => (

        <Box>
            <Pressable bg="white">
                <Box
                    pl="4"
                    pr="5"
                    py="2"
                >


                    <HStack alignItems="center" space={3}>
                        {/* <Avatar size="48px" source={{ uri: "https://www.computerhope.com/jargon/g/guest-user.jpg" }} /> */}
                        <Fontisto name="hotel" size={24} color="black" />
                        <VStack>
                            <Text color="coolGray.800" _dark={{ color: 'warmGray.50' }} bold>
                                {item.HotelName}
                            </Text>
                            <Text color="coolGray.600" _dark={{ color: 'warmGray.200' }}>{item.HotelLocation}</Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" color="coolGray.800" _dark={{ color: 'warmGray.50' }} alignSelf="flex-start">
                            {item.id}
                        </Text>
                    </HStack>
                </Box>
            </Pressable>
        </Box>
    );

    const renderHiddenItem = (data, rowMap) => (
        <HStack flex="1" pl="2">
            <Pressable
                w="70"
                ml="auto"

                bg="coolGray.200"
                justifyContent="center"
                onPress={() => closeRow(rowMap, data.item.key)}
                _pressed={{
                    opacity: 0.5,
                }}>
                <VStack alignItems="center" space={2}>
                    <Icon
                        as={<Entypo name="dots-three-horizontal" />}
                        size="xs"
                        color="coolGray.800"
                    />
                    <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                        More
                    </Text>
                </VStack>
            </Pressable>
            <Pressable
                w="70"

                bg="red.500"
                justifyContent="center"
                onPress={() => deleteRow(rowMap, data.item.key)}
                _pressed={{
                    opacity: 0.5,
                }}>
                <VStack alignItems="center" space={2}>
                    <Icon as={<MaterialIcons name="delete" />} color="white" size="xs" />
                    <Text color="white" fontSize="xs" fontWeight="medium">
                        Delete
                    </Text>
                </VStack>
            </Pressable>
        </HStack>
    );


    if (!isLoading) {
        return (
            <Box bg="white" safeArea flex="1">
                <SwipeListView
                    data={listData}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-130}
                    previewRowKey={'0'}
                    previewOpenValue={-40}
                    previewOpenDelay={3000}
                    onRowDidOpen={onRowDidOpen}
                />
            </Box>

        );
    } else {
        return (

            <Center flex={1} px="3">
                <HStack space={2} alignItems="center">
                    <Spinner accessibilityLabel="Loading posts" />
                    <Heading color="primary.500" fontSize="md">
                        please wait as we put together the rooms you have booked!
                    </Heading>
                </HStack>
            </Center>);
    }




}