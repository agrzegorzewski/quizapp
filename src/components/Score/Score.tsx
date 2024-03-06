import { Stack, Title } from "@mantine/core";

import { formatTime } from "~/utils/OpenTDB";

import type { QuestionState } from "../Game/Game";

interface IProps {
    miliseconds: number;
    state: QuestionState[];
}

export default function Score({ state, miliseconds }: IProps) {
    return (
        <Stack>
            <Title order={1} mx="auto" c="green.3">
                Correct: {state.filter((s) => s === "correct").length}
            </Title>
            <Title order={1} mx="auto" c="red.3">
                Incorrect: {state.filter((s) => s === "incorrect").length}
            </Title>
            <Title order={1} mx="auto" c="blue.3">
                Time: {formatTime(miliseconds)}
            </Title>
        </Stack>
    );
}
