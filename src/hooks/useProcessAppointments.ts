import { useCallback, useEffect, useState } from "react";

import { removeAppointment, addAppointment, updateAppointment } from "fbase";
import { useMessage } from "hooks";
import { useLoaderStore } from "store";
import { AppointmentsEnum, AppointmentsObject } from "types";

const INITIAL_STATE = null;

const processAppointmentFunctions: AppointmentsObject = { add: addAppointment, update: updateAppointment, remove: removeAppointment };

export const useProcessAppointment = <T>(type: AppointmentsEnum) => {
    const [data, setData] = useState<T | typeof INITIAL_STATE>(INITIAL_STATE);
    const showMessage = useMessage();
    const closeLoader = useLoaderStore.use.closeLoader();
    const openLoader = useLoaderStore.use.openLoader();
    const initProcessAppointment = useCallback((incomingData: T) => {
        setData(incomingData);
    }, []);

    const handleError = useCallback((err: any) => {
        closeLoader();
        setData(INITIAL_STATE);
        showMessage.error(err.message || JSON.stringify(err));
    }, []);

    const handleSuccess = useCallback(() => {
        setData(INITIAL_STATE);
        closeLoader();
    }, []);
    const handleInit = useCallback(() => {
        openLoader();
    }, []);

    useEffect(() => {
        if (data) {
            processAppointmentFunctions[type](data, handleError, handleSuccess, handleInit);
        }
    }, [data]);
    return initProcessAppointment;
};
export default useProcessAppointment;
