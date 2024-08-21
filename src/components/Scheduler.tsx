import Paper from "@mui/material/Paper";

import { AppointmentModel, ChangeSet, EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { AppointmentForm, CurrentTimeIndicator, DateNavigator, TodayButton, Scheduler, DayView, Appointments, WeekView, ViewSwitcher, Toolbar, MonthView, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { useManageCurrentDate, useAddAppointment, useRemoveAppointment, useSubscribeAppointments, useUpdateAppointment, useMessage } from "hooks";
import { useConnectionStatusStore } from "store";
import { validation } from "utils/validation";

const LOCALE = "pl-PL";
const COLOR_BACKGROUND = "#f5f5f5";

const WellMarketingScheduler = () => {
    const showMessage = useMessage();
    const { currentDate, setDate } = useManageCurrentDate();
    const isOnline = useConnectionStatusStore.use.isOnline();
    const appointments = useSubscribeAppointments();
    const addAppointment = useAddAppointment();
    const removeAppointment = useRemoveAppointment();
    const updateAppointment = useUpdateAppointment();

    const handleChanges = ({ added, changed, deleted }: ChangeSet) => {
        try {
            if (isOnline) {
                if (added) {
                    validation.added(added as AppointmentModel);
                    addAppointment(added as AppointmentModel);
                }
                if (changed) {
                    validation.changed(changed, appointments);
                    updateAppointment(changed);
                }
                if (deleted) {
                    // eslint-disable-next-line no-restricted-globals
                    if (confirm("Jesteś bliski nieodwracalnego usunięcia zadania. Kontynuować? ")) {
                        removeAppointment(deleted.toString());
                    }
                }
            }
        } catch (err: any) {
            showMessage.error(err.message || JSON.stringify(err));
        }
    };

    return (
        <Paper elevation={1} sx={{ margin: "10vh auto", backgroundColor: COLOR_BACKGROUND, maxWidth: "1200px" }}>
            <Scheduler firstDayOfWeek={1} data={appointments} locale={LOCALE}>
                <ViewState currentDate={currentDate} onCurrentDateChange={setDate} />
                <EditingState onCommitChanges={handleChanges} />
                <IntegratedEditing />
                <DayView startDayHour={7} endDayHour={19} />
                <WeekView startDayHour={7} endDayHour={19} />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <Appointments />
                <CurrentTimeIndicator shadePreviousAppointments={true} shadePreviousCells={true} />
                <AppointmentTooltip showOpenButton={isOnline} showDeleteButton={isOnline} />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    );
};

export default WellMarketingScheduler;
