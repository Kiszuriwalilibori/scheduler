import { useEffect } from "react";
import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

import { appointmentConverter, database } from "fbase";
import { useMessage } from "hooks";
import { useLoaderStore } from "store";
import { COLLECTION } from "config";

export const useSubscribeAppointments = () => {
    const setLoader = useLoaderStore.use.setLoader();
    const showMessage = useMessage();
    const [value, loading, error] = useCollection(collection(database, COLLECTION), {
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
