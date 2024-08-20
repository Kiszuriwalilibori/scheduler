import { doc, deleteDoc } from "firebase/firestore";
import { database } from "fbase";
import { COLLECTION } from "config";

export default async function removeAppointment(id: string, handleSuccess: Function, handleError: Function, handleInit: Function) {
    try {
        handleInit();
        await deleteDoc(doc(database, COLLECTION, id)).then(handleSuccess());
    } catch (e) {
        handleError(e);
    }
}
