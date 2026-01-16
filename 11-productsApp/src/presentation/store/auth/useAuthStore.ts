import { create } from "zustand";
import { User } from "../../../domain/entities/user";
import { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authRegister } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, _get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {

        const resp = await authLogin(email, password);

        if (!resp) {
            set({ status: 'unanthenticated', token: undefined, user: undefined });
            return false;
        }

        // guardamos el token dentro de la aplicación para el futuro uso
        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    },

    register: async (email: string, password: string, fullName: string) => {

        const resp = await authRegister(email, password, fullName);

        if (!resp) {
            set({ status: 'unanthenticated', token: undefined, user: undefined });
            return false;
        }

        // guardamos el token dentro de la aplicación para el futuro uso
        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    },

    checkStatus: async () => {

        const resp = await authCheckStatus();

        if (!resp) {
            set({ status: 'unanthenticated', token: undefined, user: undefined });
            return;
        }

        // guardamos el token dentro de la aplicación para el futuro uso
        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user });

    },

    logout: async () => {

        await StorageAdapter.removeItem('token'); // Limpia el token del almacén
        set({ status: 'unanthenticated', token: undefined, user: undefined }); // setea el estado a no autenticado

    }
}));