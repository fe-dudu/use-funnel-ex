import { Box, Button, Dialog, DialogActions } from "@mui/material";

interface Props {
    email: string;
    password: string;
    onClose: () => void;
    onEmailError: (error: Error) => void;
    onPasswordError: (error: Error) => void;
}

export default function LoginComplete({ email, password, onEmailError, onPasswordError, onClose }: Props) {
    if (!email) {
        onEmailError(new Error("email is required"));
    }

    if (!password) {
        onPasswordError(new Error("password is required"));
    }

    return (
        <Dialog fullWidth maxWidth="sm" open onClose={onClose} sx={{ mb: -50 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box>Email: {email}</Box>
                <Box>Password: {password}</Box>
            </Box>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    );
}
