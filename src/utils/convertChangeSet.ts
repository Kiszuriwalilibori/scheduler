import { AppointmentModel, ChangeSet } from "@devexpress/dx-react-scheduler";
import { ConvertChangeSet } from "types";

export const convertChangeSet: ConvertChangeSet = {
    added: (added: ChangeSet["added"]) => {
        return added as AppointmentModel;
    },
    changed: (changed: ChangeSet["changed"]) => {
        return changed;
    },
    deleted: (deleted: ChangeSet["deleted"]) => {
        return deleted!.toString();
    },
};

export default convertChangeSet;
