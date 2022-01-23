import * as React from "react"
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input, IconButton,
  CloseIcon,
  Link, Spinner,
  Button, Alert,
  HStack, useToast,
  Center, Select, CheckIcon,
  NativeBaseProvider,
} from "native-base"
import axios from 'axios'
export default function SignUpScreen({ routes, navigation }) {


  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState(['']);

  let [service, setService] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false);
  let [alert, setAlert] = React.useState(false);
  let [AlertMessage, setAlertMessage] = React.useState("");
  //   React.useEffect(() => {
  //  axios.get('https://restcountries.com/v2/all')
  //  .then((res)=>{


  // res.data.forEach(element => {
  //   console.log(element.name);
  //    //setCountryName(element.name);
  //    //console.log(countryName);
  // });
  //  })
  //   });

  const toast = useToast()

  const onChangeEvent = (event) => {
    setEmail(event)
    //console.log(email);
  }

  const onChangeEvent2 = (event) => {
    setPassword(event)
    //console.log(password);
  }

  const onChangeUsername = (event) => {
    setUsername(event)
    console.log(username);
  }

  const onChangePhone = (event) => {
    setPhone(event)
    console.log(phone);
  }


  //navigation.navigate('Hello');
  // setIsLoading(false);
  const onSubmitHandler = (event) => {
    // console.log({
    //   "username":username,
    //   "phone":phone
    // });
    event.preventDefault();
    setIsLoading(true);
    axios.post('https://hotelbooking1api.herokuapp.com/api/register', {
      name: username,
      email: email,
      phone: phone,
      password: password
    })
      .then(function (response) {

        setIsLoading(false);

        if (typeof response.data.error !== "undefined") {
          setAlert(true);
          setAlertMessage("We are having trouble onboarding you, kindly double check your input, Make sure that you are using a unique email address and that you have filled all the fields with correct information");
        } else {
          //setAlertMessage("We successfully registered you to the system, you can now go back and sign in");
          console.log(response.data);
          navigation.navigate('Signin');
          

        };




      })
      .catch(function (error) {
        console.log(error);
      });
  }

  let AlertRender;
  if (alert) {
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
              Kindly double check your entries!
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
  } else {
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
            Hotel Booking App! {service}
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
            Get Started!
          </Heading>

          {AlertRender}


          {isLoading ? <HStack space={2} alignItems="center">
            <Spinner size="lg" accessibilityLabel="Trying to sign you in!" />
            <Heading color="primary.500" fontSize="xl">
              We are trying to Onboard you on to the system...
            </Heading>
          </HStack> :

            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Email ID</FormControl.Label>
                <Input name="email" value={email} onChangeText={onChangeEvent} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Username</FormControl.Label>
                <Input name="username" value={username} onChangeText={onChangeUsername} />
              </FormControl>

              <FormControl>
                <FormControl.Label>Phone</FormControl.Label>
                <Input name="phone" value={phone} onChangeText={onChangePhone} />
              </FormControl>

              <FormControl>

                <FormControl.Label>Password</FormControl.Label>
                <Input name="password" value={password} onChangeText={onChangeEvent2} type="password" />

              </FormControl>
              <FormControl>

                <FormControl.Label> Confirm Password</FormControl.Label>
                <Input name="cpassword" value={password} onChangeText={onChangeEvent2} type="password" />
                <Link
                  _text={{
                    fontSize: "xs",
                    fontWeight: "500",
                    color: "indigo.500",
                  }}
                  alignSelf="flex-end"
                  mt="1"
                >
                  Terms and conditions...
                </Link>
              </FormControl>
              <Button type="submit" mt="2" colorScheme="indigo"
                onPress={onSubmitHandler}>
                Create an account
              </Button>
              <HStack mt="6" justifyContent="center">
                <Text
                  fontSize="sm"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  I'm an existing user.{" "}
                </Text>
                <Button variant="ghost" colorScheme="success"
                  onPress={() => navigation.navigate('Signin')}>
                  Sign in
                </Button>
              </HStack>
            </VStack>}
        </Box>
      </Center>
    </NativeBaseProvider>
  )
}