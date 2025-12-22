import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { darkColors, lightColors, ThemeColors } from "../../config/theme/theme";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
// import { Appearance, AppState } from "react-native";

type ThemeColor = 'Light' | 'Dark';

interface ThemeContextProps {
    currentTheme: ThemeColor;
    colors: ThemeColors;
    isDark: boolean;

    setTheme: (theme: ThemeColor) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);


export const ThemeProvider = ({ children }: PropsWithChildren) => {

    const colorScheme = useColorScheme();
    const [currentTheme, setCurrentTheme] = useState<ThemeColor>('Light');

    const isDark = currentTheme === 'Dark';
    const colors = isDark ? darkColors : lightColors;

    // Efecto que se dispara cada vez que cambia el tema de la aplicación para adaptarla al del S.O.
    useEffect(() => {
        if (colorScheme === 'dark') {
            setCurrentTheme('Dark');
        } else {
            setCurrentTheme('Light');
        }
    }, [colorScheme]);

    // Otra forma para sincronizar el tema de la aplicación con el tema del S.O.
    // useEffect(() => {
    //     const subscription = AppState.addEventListener('change', nextAppState => {

    //         const colorScheme = Appearance.getColorScheme();
    //         setCurrentTheme(colorScheme === 'dark' ? 'Dark' : 'Light');

    //     });

    //     return () => {
    //         subscription.remove();
    //     };
    // }, []);

    const setTheme = (theme: ThemeColor) => {
        setCurrentTheme(theme);
    };

    return (
        // Configuramos el tema de la aplicación desde react navigation https://reactnavigation.org/docs/themes/
        <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <ThemeContext.Provider
                value={{
                    currentTheme: currentTheme,
                    colors: colors,
                    isDark: isDark,
                    setTheme: setTheme
                }}
            >
                {children}
            </ThemeContext.Provider>
        </NavigationContainer>
    );
};