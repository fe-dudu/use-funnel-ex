import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
    email: string;
    onNext: (text: string) => void;
    onError: (error: Error) => void;
}

export default function PasswordField({ email, onNext, onError }: Props) {
    const [text, setText] = useState<string>("");

    if (!email) {
        onError(new Error("email is required"));
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box component="label">PasswordField</Box>
            <TextField size="small" onChange={(e) => setText(e.target.value)} sx={{ background: "#fff" }} />
            <Button variant="contained" color="info" disabled={!text} onClick={() => onNext(text)}>
                Next
            </Button>
        </Box>
    );
}
