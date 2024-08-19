import { CircularProgress, Modal } from "@mui/material";

import { useDelayedCondition } from "hooks";
import { circularProgressSx } from "./Loader.styles";
import { useLoaderStore } from "store";

export const Loader = () => {
    const isActive = useLoaderStore.use.isLoaderActive();
    const shouldRenderLoader = useDelayedCondition(isActive);
    return (
        <Modal open={shouldRenderLoader} aria-label="Loading">
            <CircularProgress color="warning" sx={circularProgressSx} />
        </Modal>
    );
};
export default Loader;
