import { Button, Stack, Typography } from "@mui/material";

interface Props {
    email: string;
    onNext: () => void;
}

export default function SignUpComplete({ email, onNext }: Props) {
    return (
        <Stack gap={2}>
            <Typography>{email}님 반가워요 !</Typography>
            <Button onClick={onNext}>로그인 페이지로</Button>
        </Stack>
    );
}
