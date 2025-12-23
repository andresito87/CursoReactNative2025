import { createContext, PropsWithChildren } from "react";
import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
    MD3LightTheme,
    MD3DarkTheme,
} from 'react-native-paper';
import { adaptNavigationTheme, PaperProvider } from 'react-native-paper';
import { useColorScheme } from "react-native";
import merge from 'deepmerge';

const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
});

// Combinamos lo que contiene el tema por default de la librería con la versión Material Design 3, utilizando la última versión del paquete
const CombinedLightTheme = merge(MD3LightTheme, LightTheme);
const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);

export const ThemeContext = createContext({
    isDark: false,
    theme: CombinedLightTheme
});

export const ThemeContextProvider = ({ children }: PropsWithChildren) => {

    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const theme = isDark ? CombinedDarkTheme : CombinedLightTheme;

    return (
        < PaperProvider theme={theme} >
            <NavigationContainer theme={theme}>
                <ThemeContext.Provider
                    value={{
                        isDark,
                        theme
                    }}>
                    {children}
                </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>
    );
};