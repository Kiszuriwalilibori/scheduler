import { useCallback, useEffect, useState } from "react";

import { removeAppointment } from "fbase";
import { useMessage } from "hooks";
import { useLoaderStore } from "store";

export const useRemoveAppointment = () => {
    const [removed, setRemoved] = useState<null | string>(null);
    const showMessage = useMessage();
    const closeLoader = useLoaderStore.use.closeLoader();
    const openLoader = useLoaderStore.use.openLoader();
    const initRemoveAppointment = useCallback((id: string) => {
        setRemoved(id);
    }, []);

    const handleError = useCallback((err: any) => {
        closeLoader();
        showMessage.error(err.message || JSON.stringify(err));
    }, []);

    const handleSuccess = useCallback(() => {
        closeLoader();
    }, []);
    const handleInit = useCallback(() => {
        openLoader();
    }, []);

    useEffect(() => {
        if (removed) {
            removeAppointment(removed, handleError, handleSuccess, handleInit);
        }
    }, [removed]);
    return initRemoveAppointment;
};
export default useRemoveAppointment;
