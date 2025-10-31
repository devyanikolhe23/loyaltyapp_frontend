import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/user/LoginScreen';
import RegistrationScreen from '../screens/user/RegisterScreen';
// import ForgotPasswordScreen from '../screens/user/ForgotPasswordScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      {/* <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} /> */}
    </Stack.Navigator>
  );
}