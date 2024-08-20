import { SnackbarProvider } from "notistack";
import { ReactNode } from "react";

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            {children}
        </SnackbarProvider>
    );
};

export default AppProvider;
