import { createFunnelSteps, useFunnel } from "@use-funnel/react-router-dom";

type FormState = {
    email?: string;
    password?: string;
    isPersonalInfoAgreed?: boolean;
    isMarketingInfoConsent?: boolean;
};

const steps = createFunnelSteps<FormState>()
    .extends("accountStep")
    .extends("agreementStep", { requiredKeys: ["email", "password"] })
    .extends("completeStep", { requiredKeys: ["isPersonalInfoAgreed", "isMarketingInfoConsent"] })
    .build();

export default function useSignUpFunnel() {
    return useFunnel({
        id: "sign-up",
        steps: steps,
        initial: {
            step: "accountStep",
            context: {},
        },
    });
}
