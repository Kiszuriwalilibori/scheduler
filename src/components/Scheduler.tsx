import Paper from "@mui/material/Paper";

import { AppointmentModel, ChangeSet, EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { AppointmentForm, CurrentTimeIndicator, DateNavigator, TodayButton, Scheduler, DayView, Appointments, WeekView, ViewSwitcher, Toolbar, MonthView, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { useManageCurrentDate, useAddAppointment, useRemoveAppointment, useSubscribeAppointments, useUpdateAppointment } from "hooks";
import { useConnectionStatusStore } from "store";

const LOCALE = "pl-PL";

const WellMarketingScheduler = () => {
    const { currentDate, setDate } = useManageCurrentDate();
    const isOnline = useConnectionStatusStore.use.isOnline();
    const appointments = useSubscribeAppointments();
    const addAppointment = useAddAppointment();
    const removeAppointment = useRemoveAppointment();
    const updateAppointment = useUpdateAppointment();

    const handleChanges = ({ added, changed, deleted }: ChangeSet) => {
        if (added && isOnline) {
            addAppointment(added as AppointmentModel);
        }
        if (changed && isOnline) {
            updateAppointment(changed);
        }
        if (deleted && isOnline) {
            removeAppointment(deleted.toString());
        }
    };
    if (!appointments) {
        return null;
    }

    return (
        <Paper>
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
