import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const UserConsentSchema = z.object({
    isPersonalInfoAgreed: z.boolean().refine((val) => val === true, {
        message: "개인정보 제공 동의는 필수 항목입니다.",
    }),
    isMarketingInfoConsent: z.boolean(),
});

interface Props {
    isPersonalInfoAgreed?: boolean;
    isMarketingInfoConsent?: boolean;
    onNext: (isPersonalInfoAgreed: boolean, isMarketingInfoConsent: boolean) => void;
}

export default function UserConsentForm({
    isPersonalInfoAgreed = false,
    isMarketingInfoConsent = false,
    onNext,
}: Props) {
    const {
        control,
        handleSubmit,
        formState: { isValid },
    } = useForm({
        defaultValues: {
            isPersonalInfoAgreed: isPersonalInfoAgreed,
            isMarketingInfoConsent: isMarketingInfoConsent,
        },
        resolver: zodResolver(UserConsentSchema),
        mode: "onChange",
    });

    return (
        <form
            noValidate
            onSubmit={handleSubmit((values) => {
                onNext(values.isPersonalInfoAgreed, values.isMarketingInfoConsent);
            })}>
            <Stack gap={2}>
                <Controller
                    name="isPersonalInfoAgreed"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel {...field} required control={<Checkbox />} label="개인정보 제공 동의" />
                    )}
                />

                <Controller
                    name="isMarketingInfoConsent"
                    control={control}
                    render={({ field }) => (
                        <FormControlLabel {...field} control={<Checkbox />} label="마케팅 정보 수신 동의" />
                    )}
                />

                <Button type="submit" variant="contained" color="info" disabled={!isValid}>
                    다음
                </Button>
            </Stack>
        </form>
    );
}
