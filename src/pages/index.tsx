import { Card, CardContent } from "@mui/material";
import { isNil } from "es-toolkit";
import Executor from "../components/Executor";
import LoginComplete from "../components/SignUpComplete";
import UserAccountForm from "../components/UserAccountForm";
import UserConsentForm from "../components/UserConsentForm";
import useSignUpFunnel from "../hooks/useSignUpFunnel";

export default function IndexPage() {
    const funnel = useSignUpFunnel();

    return (
        <Card sx={{ width: 350, maxWidth: 350 }}>
            <CardContent>
                <funnel.Render
                    accountStep={({ history }) => (
                        <UserAccountForm
                            onNext={(email, password) => history.push("agreementStep", { email, password })}
                        />
                    )}
                    agreementStep={({ context, history }) => (
                        <>
                            <Executor
                                isExecute={!context.email && !context.password}
                                action={() => history.push("accountStep", {})}
                            />
                            <UserConsentForm
                                isPersonalInfoAgreed={context.isPersonalInfoAgreed}
                                isMarketingInfoConsent={context.isMarketingInfoConsent}
                                onNext={(isPersonalInfoAgreed, isMarketingInfoConsent) => {
                                    history.push("completeStep", { isPersonalInfoAgreed, isMarketingInfoConsent });
                                }}
                            />
                        </>
                    )}
                    completeStep={({ context, history }) => (
                        <>
                            <Executor
                                isExecute={!context.email && !context.password}
                                action={() => history.push("accountStep", {})}
                            />
                            <Executor
                                isExecute={isNil(context.isPersonalInfoAgreed) && isNil(context.isMarketingInfoConsent)}
                                action={() => {
                                    history.push("agreementStep", { email: context.email, password: context.password });
                                }}
                            />
                            <LoginComplete email={context.email} onNext={() => {}} />
                        </>
                    )}
                />
            </CardContent>
        </Card>
    );
}
