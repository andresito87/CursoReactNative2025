import { PropsWithChildren, useEffect } from 'react';
import { AppState } from 'react-native';
import { usePermissionStore } from '../store/permissions/usePermissionStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';

export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    useEffect(() => {
        if (locationStatus === 'granted') {
            navigation.reset({
                routes: [{ name: 'MapScreen' }]
            });
        } else if (locationStatus !== 'undetermined') {
            navigation.reset({
                routes: [{ name: 'PermissionsScreen' }]
            });
        }
    }, [locationStatus, navigation]);


    useEffect(() => { // reviso los permisos tan pronto se monta el componente, una sola vez
        checkLocationPermission();
    });

    useEffect(() => { // me subscribo a los cambios del estado de la aplicación, se ejecuta cada vez que cambia el estado de la aplicación
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState === 'active') { // reviso lo permisos de la localización cuando el usuario abre la aplicación
                checkLocationPermission();
            }
        });

        return () => { // limpieza de la subscripción
            subscription.remove();
        };
    });

    return (
        <>{children}</>
    );
};