import { doc, setDoc } from "firebase/firestore";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

import { database } from "fbase";
import { COLLECTION } from "config";

export async function addAppointment(data: AppointmentModel, handleError: Function, handleSuccess: Function, handleInit: Function) {
    const id = Number(new Date()).toString();

    try {
        handleInit();
        await setDoc(doc(database, COLLECTION, id), data, {
            merge: true,
        }).then(() => {
            handleSuccess();
        });
    } catch (e) {
        handleError(e);
    }
}

export default addAppointment;
