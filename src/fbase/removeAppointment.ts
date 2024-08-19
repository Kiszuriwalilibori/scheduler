import { getFirestore, doc, deleteDoc } from "firebase/firestore";

import { firebase_app } from "fbase";

const db = getFirestore(firebase_app);

export default async function removeAppointment(ID: string, handleSuccess: Function, handleError: Function) {
    try {
        await deleteDoc(doc(db, "appointments", ID)).then(handleSuccess());
    } catch (e) {
        handleError(e);
    }
}
