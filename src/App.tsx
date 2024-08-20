import { Scheduler, Loader } from "components";
import useHandleConnectionStatus from "hooks/useHandleConnectionStatus";

function App() {
    useHandleConnectionStatus();

    return (
        <>
            <Scheduler />
            <Loader />
        </>
    );
}

export default App;
