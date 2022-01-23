import React from 'react'
import { View } from 'react-native'
import {
    Box,
    Text,
    Heading,
    VStack,
    FormControl,
    Input, Alert,
    Link,
    Button, Spinner,
    HStack, TextArea,
    Center,
    NativeBaseProvider,
} from "native-base"
import { MaterialIcons } from '@expo/vector-icons';
export default function ViewRoomDetails({ route }) {
    const { name, location, id, created } = route.params;
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

                    </Box>
                </VStack>
            </Alert></Center>
    )
}