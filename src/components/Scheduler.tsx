import Paper from "@mui/material/Paper";

import { AppointmentModel, ChangeSet, EditingState, IntegratedEditing, ViewState } from "@devexpress/dx-react-scheduler";
import { AppointmentForm, DateNavigator, TodayButton, Scheduler, DayView, Appointments, WeekView, ViewSwitcher, Toolbar, MonthView, AppointmentTooltip } from "@devexpress/dx-react-scheduler-material-ui";

import { useManageCurrentDate, useAddAppointment, useSubscribeAppointments } from "hooks";

const WellMarketingScheduler = () => {
    const { currentDate, setDate } = useManageCurrentDate();
    const appointments = useSubscribeAppointments();
    const initAddAppointment = useAddAppointment();

    const handleChanges = ({ added, changed, deleted }: ChangeSet) => {
        if (added) {
            initAddAppointment(added as AppointmentModel);
        }
        if (changed) {
        }
        if (deleted !== undefined) {
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
                <DayView startDayHour={9} endDayHour={14} />
                <WeekView startDayHour={9} endDayHour={14} />
                <MonthView />
                <Toolbar />
                <ViewSwitcher />
                <DateNavigator />
                <TodayButton />
                <Appointments />
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
