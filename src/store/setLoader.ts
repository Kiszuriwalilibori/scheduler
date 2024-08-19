import { create } from "zustand";
import createSelectors from "./createSelectors";

const INITIAL_LOADER_STATE = false;

interface LoaderState {
    isLoaderActive: boolean;
    openLoader: () => void;
    closeLoader: () => void;
    setLoader: (arg0: boolean) => void;
}

const useLoaderStoreBase = create<LoaderState>()(set => ({
    isLoaderActive: INITIAL_LOADER_STATE,
    closeLoader: () => {
        set(() => ({ isLoaderActive: INITIAL_LOADER_STATE }));
    },
    openLoader: () => {
        set(() => ({ isLoaderActive: true }));
    },
    setLoader: (isActive: boolean) => {
        set(() => ({ isLoaderActive: isActive }));
    },
}));

export const useLoaderStore = createSelectors(useLoaderStoreBase);
