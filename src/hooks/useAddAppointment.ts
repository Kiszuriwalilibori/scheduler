import { useCallback, useEffect, useState } from "react";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

import addAppointment from "fbase/addAppointment";
import useMessage from "./useMessage";
import { useLoaderStore } from "store";

export const useAddAppointmentState = () => {
    const [added, setAdded] = useState<null | AppointmentModel>(null);
    const showMessage = useMessage();
    const closeLoader = useLoaderStore.use.closeLoader();
    const openLoader = useLoaderStore.use.openLoader();
    const initAddAppointment = useCallback((data: AppointmentModel) => {
        setAdded(data);
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
        if (added) {
            addAppointment(added, handleError, handleSuccess, handleInit);
        }
    }, [added]);
    return initAddAppointment;
};
export default useAddAppointmentState;
