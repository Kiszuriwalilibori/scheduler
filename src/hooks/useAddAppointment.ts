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
        showMessage.error(err.message || JSON.stringify(err));
    }, []);

    const handleSuccess = useCallback(() => {
        closeLoader();
    }, []);
    const handleInit = useCallback((data: AppointmentModel) => {
        if (data.startDate < new Date()) throw new Error("Nie można dodać wydarzenia z czasem utworzenia wcześniejszym niż aktualny");
        if (!data.title) throw new Error("Zadanie musi mieć tytuł");
        if (data.endDate && data.startDate > data.endDate) throw new Error("Czas zakończenia musi być późniejszy niż czas rozpoczęcia");
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
