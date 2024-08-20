import { useEffect } from "react";

import useMessage from "./useMessage";

import { useConnectionStatusStore } from "store";

export const useHandleConnectionStatus = () => {
    const showMessage = useMessage();
    const setIsOnline = useConnectionStatusStore.use.setIsOnline();

    useEffect(() => {
        const handleStatusChange = () => {
            navigator.onLine && showMessage.success("Przywrócono połączenie z internetem");
            navigator.onLine && setIsOnline(true);
            !navigator.onLine && showMessage.error("Utraciłeś połączenie  internetem. Niektóre funkcjonalności mogą nie działać normalnie");
            !navigator.onLine && setIsOnline(false);
        };
        window.addEventListener("online", handleStatusChange);
        window.addEventListener("offline", handleStatusChange);

        return () => {
            window.removeEventListener("offline", handleStatusChange);
            window.removeEventListener("online", handleStatusChange);
        };
    }, [showMessage, setIsOnline]);
};
export default useHandleConnectionStatus;
