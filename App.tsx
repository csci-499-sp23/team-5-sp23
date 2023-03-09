import React from 'react';
import GeneAIAPP from './pages/GeneAIApp';
import LoginPage from './pages/LoginPage';
import MatchupPage from './pages/MatchupPage';
import MessagingPage from './pages/MessagingPage';
import ProfilePage from './pages/ProfilePage';
import SignupPage from './pages/SignupPage';
import TermsConditions from './pages/TermsConditions';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined, // undefined because you aren't passing any params to the home screen
  Signup: undefined,
  Login: undefined,
  Matchup: undefined,
  Messaging: undefined,
  Profile: undefined,
  TOS: undefined,
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false //pls make this false
        }}>
        <Stack.Screen name="Home" component={GeneAIAPP} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Matchup" component={MatchupPage} />
        <Stack.Screen name="Messaging" component={MessagingPage} />
        <Stack.Screen name="Profile" component={ProfilePage} />
        <Stack.Screen name="TOS" component={TermsConditions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

