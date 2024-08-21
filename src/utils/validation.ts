import { AppointmentModel } from "@devexpress/dx-react-scheduler";

export const validation = {
    added: (added: AppointmentModel) => {
        if (added.startDate < new Date()) throw new Error("Nie można dodać wydarzenia z czasem utworzenia wcześniejszym niż aktualny");
        if (!added.title) throw new Error("Zadanie musi mieć tytuł");
        if (added.endDate && added.startDate > added.endDate) throw new Error("Czas zakończenia musi być późniejszy niż czas rozpoczęcia");
    },
    changed: (changed: any) => {
        const id = changed ? Object.keys(changed)[0] : undefined;
        const data = changed && id ? changed[id] : undefined;
        if (data && Object.hasOwn(data, "title") && !data.title) throw new Error("Zadanie musi mieć tytuł");
        if (data.startDate < new Date()) throw new Error("Nie można zapisać wydarzenia z czasem utworzenia wcześniejszym niż aktualny");
        // if (data.endDate && data.startDate > data.endDate) throw new Error("Czas zakończenia musi być późniejszy niż czas rozpoczęcia");
    },
};
