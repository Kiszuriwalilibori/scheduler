import { useCallback, useState } from "react";

export const useManageCurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const setDate = useCallback((date: Date) => {
        setCurrentDate(date);
    }, []);
    return { currentDate, setDate };
};

export default useManageCurrentDate;
