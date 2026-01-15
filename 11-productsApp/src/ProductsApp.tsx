import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { StackNativeNavigator } from './presentation/navigation/StackNativeNavigator';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient(); // Tanstack Query Client

export const ProductsApp = () => {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const baseTheme = isDark ? DarkTheme : DefaultTheme;
    const evaTheme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor = isDark ?
        evaTheme['color-basic-800'] : evaTheme['color-basic-100'];

    const navTheme = {
        ...baseTheme,
        colors: {
            ...baseTheme.colors,
            primary: evaTheme['color-primary-500'],
            background: backgroundColor,
            card: evaTheme['color-basic-100'],
            text: evaTheme['text-basic-color'],
            border: evaTheme['color-basic-800'],
            notification: evaTheme['color-primary-500'],
        },
    };

    return (
        <QueryClientProvider client={queryClient}>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider
                {...eva} theme={evaTheme}
            >
                <NavigationContainer theme={navTheme}>
                    <AuthProvider>
                        <StackNativeNavigator />
                    </AuthProvider>
                </NavigationContainer>
            </ApplicationProvider>
        </QueryClientProvider>
    );
};