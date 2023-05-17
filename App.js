import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AI from './ROBO/AI';
import Allsettings from './ROBO/Settings/Allsettings';



import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import AnswerAI from './ROBO/AnswerAI';
import { Alert } from 'react-native/types';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen

        options={{

          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },

        }}


        name="AI" component={AI} />
      <Stack.Screen


        options={{

          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },

        }}


        name="AnswerAI" component={AnswerAI} />



      <Stack.Screen



        options={{
          headerStyle: { backgroundColor: '#53065c' },
          headerTintColor: '#fff',

          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 500,
              },
            },
          },

        }}


        name="Settings" component={Allsettings} />

    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>

      <MyStack />

    </NavigationContainer>
  );
}

