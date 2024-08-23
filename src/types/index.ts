import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export type Changed = { [key: string]: AppointmentModel } | undefined;

export type AppointmentsEnum = "remove" | "update" | "add";

export type AppointmentsObject = {
    [key in AppointmentsEnum]: any;
};

export type IncomingAppointmentChanges = AppointmentModel | Changed | string;
