import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import Addchat from './screens/Addchat';
import Chatscreen from './screens/Chatscreen';

const stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle :{ backgroundColor : '#2c6bed'},
  headerTintColor: 'white'
}

export default function App() {
  return (
    <>
    <StatusBar style='light'/>
    <NavigationContainer >
      <stack.Navigator  screenOptions={globalScreenOptions}>
    <stack.Screen name='Login' component={LoginScreen} />
    <stack.Screen name='Register' component={RegisterScreen} />
    <stack.Screen name='Home' component={HomeScreen} />
    <stack.Screen name='Addchat' component={Addchat} />
    <stack.Screen name='Chat' component={Chatscreen} />
      </stack.Navigator>
    </NavigationContainer>
    </>
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
