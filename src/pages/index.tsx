import EmailField from "../components/EmailField";
import LoginComplete from "../components/LoginComplete";
import PasswordField from "../components/PasswordField";
import useLoginFunnel from "../hooks/useLoginFunnel";

export default function IndexPage() {
    const funnel = useLoginFunnel();

    return (
        <funnel.Render
            emailStep={({ history }) => <EmailField onNext={(email) => history.push("passwordStep", { email })} />}
            passwordStep={funnel.Render.with({
                events: {
                    passwordSuccess: (password: string, { history }) => {
                        history.push("completeStep", { password });
                    },
                    emailError: (_: Error, { history }) => {
                        history.push("emailStep", {});
                    },
                },
                render({ context, dispatch }) {
                    return (
                        <PasswordField
                            email={context.email}
                            onNext={(password) => dispatch("passwordSuccess", password)}
                            onError={(error) => dispatch("emailError", error)}
                        />
                    );
                },
            })}
            completeStep={funnel.Render.overlay({
                events: {
                    emailError: (_: Error, { history }) => {
                        history.push("emailStep", {});
                    },
                    passwordError: (_: Error, { history, context }) => {
                        history.push("passwordStep", { email: context.email });
                    },
                },
                render({ context, dispatch, close }) {
                    return (
                        <LoginComplete
                            email={context.email}
                            password={context.password}
                            onEmailError={(error) => dispatch("emailError", error)}
                            onPasswordError={(error) => dispatch("passwordError", error)}
                            onClose={close}
                        />
                    );
                },
            })}
        />
    );
}
