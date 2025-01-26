interface Props {
    isExecute: boolean;
    action: () => void;
}

export default function Executor({ isExecute, action }: Props) {
    if (isExecute) {
        action();
    }

    return null;
}
