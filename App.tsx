import React from 'react';
import GeneAIAPP from './pages/GeneAIApp';
import LoginPage from './pages/LoginPage';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Login: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false //pls make this false
        }}>
        <Stack.Screen
          name="Home"
          component={GeneAIAPP}
        />
        <Stack.Screen name="Login" component={LoginPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

