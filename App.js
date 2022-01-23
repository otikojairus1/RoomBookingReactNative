import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeBaseProvider, Box } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignUpScreen from './Screens/Signup';
import CreateRoom from './Screens/CreateRoom';
import SignInScreen from './Screens/Signin';
import Done from './Screens/Done'
import RoomList from './Screens/RoomsList';
import ViewRoomDetails from './Screens/ViewRoomDetail';
import BookRoom from './Screens/BookRoom';
import BookSuccess from './Screens/BookSuccess';
import BookedRoomList from './Screens/BookedList';
export default function App() {
  const Stack2 = createNativeStackNavigator();
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack2.Navigator initialRouteName="SplashScreen">
          <Stack2.Screen name="Signin" component={SignInScreen} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Create Room" component={CreateRoom} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Done" component={Done} options={{ headerShown: false, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Rooms Available" component={RoomList} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Room Detail" component={ViewRoomDetails} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Book Room" component={BookRoom} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Booked" component={BookSuccess} options={{ headerShown: true, headerTitleAlign: "center" }} />
          <Stack2.Screen name="Booked Room List" component={BookedRoomList} options={{ headerShown: true, headerTitleAlign: "center" }} />
        </Stack2.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}


