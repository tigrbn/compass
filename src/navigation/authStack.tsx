import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../screens/Welcome';
import SignInScreen from '../screens/SignIn';
import SignUpScreen from '../screens/SignUp';
import ForgotPassScreen from '../screens/ForgotPass';
// import PhoneScreen from '../screens/Phone';
import PrivacyScreen from '../screens/Privacy'
import PersonalScreen from '../screens/Personal'

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
          screenOptions={{
             cardStyle: {
            backgroundColor: '#0053A9',
          },
          headerShown: true
        }}>
          
        <Stack.Screen name="Welcome"  options={{title: ''}} component={WelcomeScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen}  options={{
          title: 'Авторизация',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        }}/>
        <Stack.Screen name="Sign Up" component={SignUpScreen}  options={{
          title: 'Регистрация',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white'
          },
        }}/>
        <Stack.Screen name="FogotPass" component={ForgotPassScreen} />
        <Stack.Screen name="Privacy" component={PrivacyScreen}  options={{title: ''}} />
        <Stack.Screen name="Personal" component={PersonalScreen}  options={{title: ''}} />
        {/* <Stack.Screen name="Phone" component={PhoneScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
