import { doc, updateDoc } from "firebase/firestore";

import { database } from "fbase";
import { Changed } from "types";
import { COLLECTION } from "config";

export default async function updateAppointment(changed: Changed, handleSuccess: Function, handleError: Function, handleInit: Function) {
    const id = changed ? Object.keys(changed)[0] : undefined;
    const data = changed && id ? changed[id] : undefined;
    if (!id || !data) return;
    try {
        handleInit();
        await updateDoc(doc(database, COLLECTION, id), data).then(handleSuccess());
    } catch (e) {
        handleError(e);
    }
}
