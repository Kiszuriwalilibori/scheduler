import { deleteDoc } from "firebase/firestore";
import { partialDoc } from "fbase";

export default async function removeAppointment(id: string, handleSuccess: Function, handleError: Function, handleInit: Function) {
    try {
        handleInit();
        await deleteDoc(partialDoc(id)).then(handleSuccess());
    } catch (e) {
        handleError(e);
    }
}
