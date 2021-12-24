/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, { useEffect } from 'react';
 import {View} from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import SignupScreen from '../screens/SignupScreen'
 import LoginScreen from '../screens/LoginScreen';
 import OnboardingScreen from '../screens/OnboardingScreen';
 import { AsyncStorage } from 'react-native';
 import FontAwesome from 'react-native-vector-icons/FontAwesome';
 import { GoogleSignin } from '@react-native-google-signin/google-signin';
 
 const Stack = createNativeStackNavigator();
 
 const AuthStack = () => {
   const [isFirstLaunch,setIsFirstLaunch] = React.useState(null);
   let routeName;
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if(value == null){
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      }else{
        setIsFirstLaunch(false);
      }
    });
    GoogleSignin.configure({
      webClientId: '106461857039-6aefoqgbs2pm3kutg4ifkb5h9kreq2q9.apps.googleusercontent.com',
    });
  }, []);
  
  if(isFirstLaunch == null){
    return null;
  }else if(isFirstLaunch == true){
     routeName = 'Onboarding';
  }else{
    routeName = 'Login';
  }
return(
    <Stack.Navigator initialRouteName={routeName}>
        <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{header: () => null}}
        />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{header: () => null}}
        />
        <Stack.Screen name="Signup" 
        component={SignupScreen}
         options={({navigation}) => ({
           title: '',
           headerStyle: {
            backgroundColor: '#f9fafd',
            shadowColor: '#f9fafd',
            elevation: 0,
           },
           headerLeft: () => {
           <View style={{marginLeft: 10}}>
           <FontAwesome.Button
           name="long-arrow-left"
           size={25}
           backgroundColor="#f9fafd"
           color= "#333"
           onPress={() => navigation.navigate('Login')}
           />
           </View>
           },
         })}
         />

    </Stack.Navigator>
    );
 };
 
 export default AuthStack;