import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

interface Props {
    onNext: (text: string) => void;
}

export default function EmailField({ onNext }: Props) {
    const [text, setText] = useState<string>("");

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box component="label">EmailField</Box>
            <TextField size="small" onChange={(e) => setText(e.target.value)} sx={{ background: "#fff" }} />
            <Button variant="contained" color="info" disabled={!text} onClick={() => onNext(text)}>
                Next
            </Button>
        </Box>
    );
}
