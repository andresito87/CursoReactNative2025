import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { HomeScreen } from '../screens/home/HomeScreen';

export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    RegisterScreen: undefined;
    HomeScreen: undefined;
    ProductScreen: { productId: string; };
};

const Stack = createNativeStackNavigator<RootStackParams>();

export const StackNativeNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="LoadingScreen"
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
                options={{ animation: 'fade' }}
                name="LoadingScreen"
                component={LoadingScreen} />
            <Stack.Screen
                options={{ animation: 'fade' }}
                name="LoginScreen"
                component={LoginScreen} />
            <Stack.Screen
                options={{ animation: 'fade' }}
                name="RegisterScreen"
                component={RegisterScreen} />
            <Stack.Screen
                options={{ animation: 'fade' }}
                name="HomeScreen"
                component={HomeScreen} />
            <Stack.Screen
                name="ProductScreen"
                component={ProductScreen} />
        </Stack.Navigator>
    );
};