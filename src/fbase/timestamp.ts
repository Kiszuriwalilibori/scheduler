import { AppointmentModel, SchedulerDateTime } from "@devexpress/dx-react-scheduler";
import { DocumentData, Timestamp } from "firebase/firestore";

function isTimestamp(item: any): item is Timestamp {
    return Boolean((item as Timestamp).seconds);
}

export function dateToTimestamp(date: SchedulerDateTime) {
    return date ? Timestamp.fromDate(new Date(date)) : date;
}

export function dateFromTimestamp(timestamp: Timestamp) {
    return timestamp ? timestamp.toDate() : timestamp;
}

export const appointmentConverter = {
    toFirestore(appointment: AppointmentModel) {
        return { ...appointment, startDate: dateToTimestamp(appointment.startDate), endDate: appointment.endDate ? dateToTimestamp(appointment.endDate) : appointment.endDate, exDate: appointment.exDate ? dateToTimestamp(appointment.exDate) : appointment.exDate };
    },

    fromFirestore(appointment: DocumentData, id: number | string): AppointmentModel {
        const convertedAppointment = { ...appointment };
        convertedAppointment.id = id;
        for (const field in convertedAppointment) {
            if (isTimestamp(convertedAppointment[field])) {
                const convertedDate = dateFromTimestamp(convertedAppointment[field]);
                convertedAppointment[field] = convertedDate;
            }
        }

        return convertedAppointment as AppointmentModel;
        // return { ...appointment, startDate: dateFromTimestamp(appointment.startDate), endDate: appointment.endDate ? dateFromTimestamp(appointment.endDate) : appointment.endDate, exDate: appointment.exDate ? dateFromTimestamp(appointment.exDate) : appointment.exDate };
    },
};
