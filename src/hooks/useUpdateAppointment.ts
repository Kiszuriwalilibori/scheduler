import { useCallback, useEffect, useState } from "react";

import { updateAppointment } from "fbase";
import { useMessage } from "hooks";
import { useLoaderStore } from "store";
import { Changed } from "types";

export const useUpdateAppointment = () => {
    const [changed, setChanged] = useState<Changed>(undefined);
    const showMessage = useMessage();
    const closeLoader = useLoaderStore.use.closeLoader();
    const openLoader = useLoaderStore.use.openLoader();
    const initUpdateAppointment = useCallback((changed: Changed) => {
        setChanged(changed);
    }, []);

    const handleError = useCallback((err: any) => {
        closeLoader();
        showMessage.error(err);
    }, []);

    const handleSuccess = useCallback(() => {
        closeLoader();
    }, []);
    const handleInit = useCallback(() => {
        openLoader();
    }, []);

    useEffect(() => {
        if (changed) {
            updateAppointment(changed, handleError, handleSuccess, handleInit);
        }
    }, [changed]);

    return initUpdateAppointment;
};
export default useUpdateAppointment;
