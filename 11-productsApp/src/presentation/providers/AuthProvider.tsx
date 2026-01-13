import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsWithChildren, useEffect } from 'react';
import { RootStackParams } from '../navigation/StackNativeNavigator';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
    const { status, checkStatus } = useAuthStore();

    // comprobamos el estado de autenicación
    useEffect(() => {
        checkStatus();
    }, [checkStatus]);

    useEffect(() => {

        if (status !== 'checking') {
            if (status === 'authenticated') { // redirige al home porque está autenticado correctamente
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }]
                });
            } else { // redirige al login porque no esta autenticado
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }]
                });
            }
        }

    }, [navigation, status]);

    return (
        <>
            {children}
        </>
    );
};