import { create } from "zustand";
import { Location } from "../../../infrastructure/interfaces/location";
import { clearWatchLocation, getCurrentLocation, watchCurrentLocation } from "../../../actions/location/location";

interface LocatonState {
    lastKnownLocation: Location | null;
    userLocationsList: Location[];
    watchId: number | null;
    getLocation: () => Promise<Location> | null;
    watchLocation: () => void;
    clearWatchLocation: () => void;
}

export const useLocationStore = create<LocatonState>()((set, get) => ({

    lastKnownLocation: null,
    userLocationsList: [],
    watchId: null,

    getLocation: async () => {
        const location = await getCurrentLocation();
        set({ lastKnownLocation: location });
        return location;
    },

    watchLocation: () => {
        const watchId = get().watchId;
        if (watchId !== null) {
            get().clearWatchLocation(); // limpiamos el observador de posiciones anterior
        }

        const id = watchCurrentLocation((location) => {
            set({
                lastKnownLocation: location,
                userLocationsList: [...get().userLocationsList, location] // añadimos la posición actual al array de posiciones
            });
        });

        set({ watchId: id });
    },

    clearWatchLocation: () => {
        const watchId = get().watchId;
        if (watchId !== null) {
            clearWatchLocation(watchId);
        }
    }

}));
