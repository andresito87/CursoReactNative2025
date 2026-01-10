import { Platform } from 'react-native';
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';
import { FAB } from '../ui/FAB';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useLocationStore } from '../../store/location/useLocationStore';
import { buildSpeedSegments, TimedLocation } from '../../helpers/mapPolyline';

interface Props {
    showsUserLocation: boolean;
    initialLocation: Location;
}

export const Map = ({ showsUserLocation = true, initialLocation }: Props) => {

    const mapRef = useRef<MapView>(null);
    const cameraLocation = useRef<Location>(initialLocation);
    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);

    const {
        lastKnownLocation,
        userLocationsList,
        getLocation,
        watchLocation,
        clearWatchLocation
    } = useLocationStore();

    const segments = useMemo(() => {
        return buildSpeedSegments(userLocationsList as unknown as TimedLocation[]);
    }, [userLocationsList]);

    const moveCameraToLocation = (location: Location) => {

        if (!mapRef.current) return;

        mapRef.current.animateCamera({ center: location });

    };

    const moveToCurrentLocation = async () => {

        // Mejora de cara al usuario, moviendo la cámara mientras se localiza al usuario, ya que ese proceso puede tardara
        if (!lastKnownLocation) {
            moveCameraToLocation(initialLocation);
        }

        const location = await getLocation();
        if (!location) return;
        moveCameraToLocation(location);
    };

    // Efecto que actualiza la ultima posición del dispositivo
    useEffect(() => {
        watchLocation();

        return () => { // función de limpieza para cuando se destruya el componente
            clearWatchLocation();
        };
    }, [clearWatchLocation, watchLocation]);

    // Efecto que mueve la camara a esa ultima posición conocida del dispositivo
    useEffect(() => {
        if (lastKnownLocation && isFollowingUser) {
            moveCameraToLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser]);


    return (
        <>
            <MapView
                ref={(map) => { mapRef.current = map!; }}
                showsUserLocation={showsUserLocation}
                provider={Platform.OS === 'ios' ? undefined : PROVIDER_GOOGLE} // eliminar si no usamos Google Maps y usamos Apple Maps
                style={{ flex: 1 }}
                onTouchMove={() => setIsFollowingUser(false)} // cuando el usuario mueve la cámara, dejamos de seguir el dispositivo
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >

                {isShowingPolyline && segments.length > 0 && segments.map((seg, idx) => (
                    <Fragment key={idx}>
                        {/* Borde */}
                        <Polyline
                            coordinates={seg.coordinates}
                            strokeColor={"rgba(0,0,0,0.35)"}
                            strokeWidth={seg.width + 4}
                            lineCap="round"
                            lineJoin="round"
                            geodesic
                        />
                        {/* Línea principal */}
                        <Polyline
                            coordinates={seg.coordinates}
                            strokeColor={seg.color}
                            strokeWidth={seg.width}
                            lineCap="round"
                            lineJoin="round"
                            geodesic
                        />
                    </Fragment>
                ))}

                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='Este es el título del marcador'
                    description='Este es el cuerpo del marcador'
                    image={require('../../../assets/custom-marker.png')}
                /> */}

            </MapView>

            <FAB
                iconName={isShowingPolyline ? 'eye-outline' : 'eye-off-outline'}
                onPress={() => setIsShowingPolyline(!isShowingPolyline)}
                style={{
                    bottom: 140,
                    right: 20
                }}
            />

            <FAB
                iconName={isFollowingUser ? 'walk-outline' : 'accessibility-outline'}
                onPress={() => setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom: 80,
                    right: 20
                }}
            />

            <FAB
                iconName='compass-outline'
                onPress={moveToCurrentLocation}
                style={{
                    bottom: 20,
                    right: 20
                }}
            />
        </>
    );
};
