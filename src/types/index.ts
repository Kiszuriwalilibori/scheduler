import { AppointmentModel, ChangeSet } from "@devexpress/dx-react-scheduler";

export type Changed = { [key: string]: AppointmentModel } | undefined;

export type AppointmentsEnum = "remove" | "update" | "add";

export type AppointmentsObject = {
    [key in AppointmentsEnum]: any;
};

type ChangeSetKeys = keyof ChangeSet;

export type ConvertChangeSet = { [key in ChangeSetKeys]: Function };

export type Validation = { [key in ChangeSetKeys]: Function };
