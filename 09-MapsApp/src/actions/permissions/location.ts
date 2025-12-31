import { check, openSettings, PERMISSIONS, request, PermissionStatus as RNPermissionStatus } from "react-native-permissions";
import type { PermissionStatus } from "../../infrastructure/interfaces/permissions";
import { Platform } from "react-native";


export const requestLocationPermission = async (): Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error('Unsupported platform');
    }

    if (status === 'blocked') {
        await openSettings(); // si el permiso está bloqueado, abrimos al usuario los settings del dispositivo 
        return await checkLocationPermission();
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        limited: 'limited',
        unavailable: 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
};


export const checkLocationPermission = async (): Promise<PermissionStatus> => {

    let status: RNPermissionStatus = 'unavailable';

    if (Platform.OS === 'ios') {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else if (Platform.OS === 'android') {
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    } else {
        throw new Error('Unsupported platform');
    }

    const permissionMapper: Record<RNPermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        limited: 'limited',
        unavailable: 'unavailable',
    };

    return permissionMapper[status] ?? 'unavailable';
};