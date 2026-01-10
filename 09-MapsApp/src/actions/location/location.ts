import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../infrastructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {

    return new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(info => {

            resolve({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            });


        }, (error) => {
            console.log(`Can't get the location`);
            reject(error);
        }, {
            enableHighAccuracy: true,
        });

    });

};

// Función para observar cambios en la ubicación del dispositivo
export const watchCurrentLocation = (
    locationCallback: (location: Location) => void
): number => {
    return Geolocation.watchPosition(info => (
        locationCallback({
            latitude: info.coords.latitude,
            longitude: info.coords.longitude
        })
    ), (_error) => {
        throw new Error(`Can't get watchPosition`);
    }, {
        enableHighAccuracy: true
    });
};

// Función para limpiar el observador de ubicación del dispositivo
export const clearWatchLocation = (watchId: number) => {
    Geolocation.clearWatch(watchId);
};