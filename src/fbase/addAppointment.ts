import { doc, setDoc } from "firebase/firestore";
import { AppointmentModel } from "@devexpress/dx-react-scheduler";

import { db } from "fbase";

export async function addAppointment(data: AppointmentModel, handleError: Function, handleSuccess: Function, handleInit: Function) {
    const id = Number(new Date()).toString();

    try {
        handleInit();
        await setDoc(doc(db, "appointments", id), data, {
            merge: true,
        }).then(() => {
            handleSuccess();
        });
    } catch (e) {
        handleError();
    }
}

export default addAppointment;
