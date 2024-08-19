import { useEffect } from "react";
import { getFirestore, collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { appointmentConverter, firebase_app } from "fbase";
import { useMessage } from "hooks";
import { useLoaderStore } from "store";

export const useSubscribeAppointments = () => {
    const setLoader = useLoaderStore.use.setLoader();
    const showMessage = useMessage();
    const [value, loading, error] = useCollection(collection(getFirestore(firebase_app), "appointments"), {
        snapshotListenOptions: { includeMetadataChanges: true },
    });

    useEffect(() => {
        setLoader(loading);
    }, [loading]);

    error && showMessage.error(error.message ? error.message : JSON.stringify(error));
    const appointments = value
        ? value.docs.map(doc => {
              return appointmentConverter.fromFirestore(doc.data(), doc.id);
          })
        : null; /// todo nie wiadomo czy null jest najleps\ym.

    return appointments;
};

export default useSubscribeAppointments;
