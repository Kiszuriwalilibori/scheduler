import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export const Header = () => {
    return (
        <Box sx={{ width: "100%", padding: "4vh", color: "#1976D2", backgroundColor: "lightgrey" }}>
            <Stack direction="column" spacing={2} justifyContent="center" alignItems="center">
                <h1>Well Marketing Scheduler</h1>
                <h2>Praca kwalifikacyjna wykonana przez Piotra Maksymiuka</h2>
            </Stack>
        </Box>
    );
};

export default Header;
