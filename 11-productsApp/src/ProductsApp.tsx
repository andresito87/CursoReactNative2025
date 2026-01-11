import { NavigationContainer } from '@react-navigation/native';
import { StackNativeNavigator } from './presentation/navigation/StackNativeNavigator';

export const ProductsApp = () => {
    return (
        <NavigationContainer>
            <StackNativeNavigator />
        </NavigationContainer>
    );
};