import { doc } from "firebase/firestore";
import { database } from "fbase";
import { COLLECTION } from "config";

function partially(func, ...fixedArgs) {
    return function (...remainingArgs) {
        return func.apply(null, fixedArgs.concat(remainingArgs));
    };
}

export const partialDoc = partially(doc, database, COLLECTION);
