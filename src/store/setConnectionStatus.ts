import { create } from "zustand";
import createSelectors from "./createSelectors";

const INITIAL_CONNECTION_STATE = true;

interface ConnectionState {
    isOnline: boolean;

    setIsOnline: (arg0: boolean) => void;
}

const useConnectionStatusStoreBase = create<ConnectionState>()(set => ({
    isOnline: INITIAL_CONNECTION_STATE,

    setIsOnline: (isActive: boolean) => {
        set(() => ({ isOnline: isActive }));
    },
}));

export const useConnectionStatusStore = createSelectors(useConnectionStatusStoreBase);
