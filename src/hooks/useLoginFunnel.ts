import { createFunnelSteps, useFunnel } from "@use-funnel/react-router-dom";

type FormState = {
    email?: string;
    password?: string;
};

const steps = createFunnelSteps<FormState>()
    .extends("emailStep")
    .extends("passwordStep", { requiredKeys: "email" })
    .extends("completeStep", { requiredKeys: "password" })
    .build();

export default function useLoginFunnel() {
    return useFunnel({
        id: "login",
        steps: steps,
        initial: {
            step: "emailStep",
            context: {},
        },
    });
}
