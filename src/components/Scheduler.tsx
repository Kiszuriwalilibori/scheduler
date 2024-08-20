import Paper from "@mui/material/Paper";

import { AppointmentModel, ChangeSet, EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { AppointmentForm, CurrentTimeIndicator, DateNavigator, TodayButton, Scheduler, DayView, Appointments, WeekView, ViewSwitcher, Toolbar, MonthView, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { useManageCurrentDate, useAddAppointment, useSubscribeAppointments, useUpdateAppointment } from "hooks";
import useRemoveAppointment from "hooks/useRemoveAppointment";

const WellMarketingScheduler = () => {
    const { currentDate, setDate } = useManageCurrentDate();
    const appointments = useSubscribeAppointments();
    const initAddAppointment = useAddAppointment();
    const initRemoveAppointment = useRemoveAppointment();
    const initUpdateAppointment = useUpdateAppointment();

    const handleChanges = ({ added, changed, deleted }: ChangeSet) => {
        if (added) {
            initAddAppointment(added as AppointmentModel);
        }
        if (changed) {
            initUpdateAppointment(changed);
        }
        if (deleted !== undefined) {
            initRemoveAppointment(deleted.toString());
        }
    };
    if (!appointments) {
        return null;
    }
    return (
        <Paper>
            <Scheduler data={appointments} locale="pl-PL">
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
                <AppointmentTooltip showOpenButton showDeleteButton />
                <AppointmentForm />
            </Scheduler>
        </Paper>
    );
};

export default WellMarketingScheduler;

// const x = new Date().toString();
// console.log(x);
// const y = Number(new Date(x));
// console.log(y);
