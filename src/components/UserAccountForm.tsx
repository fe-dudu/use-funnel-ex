import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const UserAccountSchema = z.object({
    email: z.string().email("유효한 이메일을 입력해주세요."),
    password: z
        .string()
        .min(8, "비밀번호는 최소 8글자 이상이어야 합니다.")
        .max(50, "비밀번호는 최대 50글자 이하이어야 합니다.")
        .refine((val) => /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).+$/.test(val), {
            message: "비밀번호는 대문자, 소문자, 숫자, 특수문자를 모두 포함해야 합니다.",
        }),
});

interface Props {
    onNext: (email: string, password: string) => void;
}

export default function UserAccountForm({ onNext }: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: { email: "", password: "" },
        resolver: zodResolver(UserAccountSchema),
        mode: "onChange",
    });

    return (
        <form noValidate onSubmit={handleSubmit((values) => onNext(values.email, values.password))}>
            <Stack gap={2}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="이메일"
                            type="email"
                            size="small"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{ background: "#fff" }}
                        />
                    )}
                />

                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            required
                            label="비밀번호"
                            type="password"
                            size="small"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            sx={{ background: "#fff" }}
                        />
                    )}
                />

                <Button type="submit" variant="contained" color="info" disabled={!isValid}>
                    다음
                </Button>
            </Stack>
        </form>
    );
}
