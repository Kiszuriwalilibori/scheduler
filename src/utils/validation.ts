import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export const validation = {
    added: (added: AppointmentModel) => {
        if (added.startDate < new Date()) throw new Error("Nie można dodać wydarzenia z czasem utworzenia wcześniejszym niż aktualny");
        if (!added.title) throw new Error("Zadanie musi mieć tytuł");
        if (added.endDate && added.startDate > added.endDate) throw new Error("Czas zakończenia musi być późniejszy niż czas rozpoczęcia");
    },
    changed: (changed: any, appointments: AppointmentModel[] | undefined) => {
        const id = changed ? Object.keys(changed)[0] : undefined;
        const data = changed && id ? changed[id] : undefined;
        const appointment = appointments?.find(item => item.id === id);
        const updated = { ...appointment, ...data };
        if (updated.startDate < new Date()) throw new Error("Nie można dodać wydarzenia z czasem utworzenia wcześniejszym niż aktualny");
        if (!updated.title) throw new Error("Zadanie musi mieć tytuł");
        if (updated.endDate && updated.startDate > updated.endDate) throw new Error("Czas zakończenia musi być późniejszy niż czas rozpoczęcia");
    },
};
