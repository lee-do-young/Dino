import React from 'react';
import { StyleSheet } from 'react-native';
import Amplify from 'aws-amplify'
import config from './src/aws-exports'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { UserProvider, GameProvider } from "./src/context";
import { 
  TutorialPage,
  StartPage,
  GamePage,
  EndPage
} from "./src/page";

Amplify.configure(config)
const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider value={'hey'}>
      <GameProvider value={'hey'}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="tutorial"
              component={TutorialPage}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="start" component={StartPage} options={{ headerShown: false }}/>
            <Stack.Screen name="game" component={GamePage} options={{ headerShown: false }}/>
            <Stack.Screen name="end" component={EndPage} options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      </GameProvider>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
