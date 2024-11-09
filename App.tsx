import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import {firebase} from '@react-native-firebase/auth';

const Stack = createStackNavigator();

let config = {
  clientId:
    '1051998036237-95q782ddl3v5u0djaolvu5i8i0lrtoa1.apps.googleusercontent.com',
  appId: '1:1051998036237:ios:49cbaf54630e3adf8a5044',
  apiKey: 'AIzaSyDwIb4AnlbZmDKY_FSMYeABJuCwo3O57v8',
  databaseURL: '',
  projectId: 'cryptomonitor-fe8ba',
  storageBucket: '',
  messagingSenderId: '',
};

firebase.initializeApp(config);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}} // 헤더 숨김 옵션
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}} // 헤더 숨김 옵션
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
