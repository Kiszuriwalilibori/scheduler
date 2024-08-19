import { doc, deleteDoc } from "firebase/firestore";
import { db } from "fbase";

export default async function removeAppointment(ID: string, handleSuccess: Function, handleError: Function, handleInit: Function) {
    try {
        handleInit();
        await deleteDoc(doc(db, "appointments", ID)).then(handleSuccess());
    } catch (e) {
        handleError(e);
    }
}
