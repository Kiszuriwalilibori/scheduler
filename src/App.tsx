import { Scheduler, Loader, Header } from "components";
import useHandleConnectionStatus from "hooks/useHandleConnectionStatus";

function App() {
    useHandleConnectionStatus();

    return (
        <>
            <Header />
            <Scheduler />
            <Loader />
        </>
    );
}

export default App;
