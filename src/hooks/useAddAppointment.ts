import { useCallback, useEffect, useState } from "react";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

import { addAppointment } from "fbase";
import { useMessage } from "hooks";
import { useLoaderStore } from "store";

export const useAddAppointment = () => {
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
export default useAddAppointment;
