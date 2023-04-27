import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import AI from './ROBO/AI' ;




import { createStackNavigator } from '@react-navigation/stack';
import AnswerAI from './ROBO/AnswerAI';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AI" component={AI} options={{headerShown  : false}} />
      <Stack.Screen name="AnswerAI" component={AnswerAI} options={{headerShown  : false}} />

    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>

      <MyStack/>

    </NavigationContainer>
  );
}

